import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { PropertyToolbar } from './components/PropertyToolbar';
import { CanvasArea } from './components/CanvasArea';
import { DownloadModal } from './components/DownloadModal';
import { SavedProjectsModal } from './components/SavedProjectsModal';
import { FirebaseHostingModal } from './components/FirebaseHostingModal';
import { ChartDataModal } from './components/ChartDataModal';
import { HelpModal } from './components/HelpModal';
import { LoadingScreen } from './components/LoadingScreen';
import { PWAInstallBanner, OfflineIndicator } from './components/PWAInstallBanner';
import {
  NewCanvasModal,
  SaveAsTemplateModal,
  LayersModal
} from './components/StudioTemplateModals';
import {
  PosterProject,
  PosterElement,
  TextElement,
  ImageElement,
  ChartElement,
  ChartType,
  PosterTemplate,
  PosterBackground,
  ShapeType,
  ShapeElement,
  TemplateCategory,
  ColorEffectPreset,
  WatermarkConfig
} from './types/poster';
import { DEFAULT_TEMPLATES } from './data/defaultTemplates';
import { TEMPLATE_CATEGORY_FILTERS } from './data/templates1000';
import { SHAPES_100_MAP } from './data/shapes100';
import { DEFAULT_WATERMARK } from './data/colorEffects';

const LOCAL_STORAGE_SAVED_KEY = 'malosha_saved_projects';
const LOCAL_STORAGE_CURRENT_KEY = 'malosha_current_project';
const LOCAL_STORAGE_CUSTOM_TEMPLATES_KEY = 'malosha_custom_templates';

export default function App() {
  const initialTemplate = DEFAULT_TEMPLATES[0];

  const [project, setProject] = useState<PosterProject>(() => {
    try {
      const saved =
        localStorage.getItem(LOCAL_STORAGE_CURRENT_KEY) ||
        localStorage.getItem('canvaposter_current_project');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.elements && parsed.width) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }

    return {
      id: `proj_${Date.now()}`,
      title: initialTemplate.titleSwahili,
      width: initialTemplate.width,
      height: initialTemplate.height,
      background: JSON.parse(JSON.stringify(initialTemplate.background)),
      elements: JSON.parse(JSON.stringify(initialTemplate.elements)),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<PosterProject[]>([project]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Selection
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Workspace Viewport
  const [zoom, setZoom] = useState<number>(0.65);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // Sidebar Tab & Mobile Drawer
  const [activeTab, setActiveTab] = useState<SidebarTab>('templates');
  const [appearanceSubTab, setAppearanceSubTab] = useState<'bg' | 'effects' | 'watermark'>('bg');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [isStudioReady, setIsStudioReady] = useState<boolean>(false);

  // Modals
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [isSavedProjectsOpen, setIsSavedProjectsOpen] = useState<boolean>(false);
  const [isFirebaseHostingOpen, setIsFirebaseHostingOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState<boolean>(false);
  const [isNewBlankModalOpen, setIsNewBlankModalOpen] = useState<boolean>(false);
  const [isSaveAsTemplateOpen, setIsSaveAsTemplateOpen] = useState<boolean>(false);
  const [isLayersModalOpen, setIsLayersModalOpen] = useState<boolean>(false);
  const [studioNotice, setStudioNotice] = useState<{ message: string; canUndo?: boolean } | null>(null);

  // Refs for zero-lag callbacks & debounced persistence
  const projectRef = useRef<PosterProject>(project);
  projectRef.current = project;
  const historyRef = useRef<PosterProject[]>(history);
  historyRef.current = history;
  const historyIndexRef = useRef<number>(historyIndex);
  historyIndexRef.current = historyIndex;
  const selectedIdRef = useRef<string | null>(selectedId);
  selectedIdRef.current = selectedId;
  const editingTextIdRef = useRef<string | null>(editingTextId);
  editingTextIdRef.current = editingTextId;
  const isSavedRef = useRef<boolean>(isSaved);
  isSavedRef.current = isSaved;

  const autoSaveTimerRef = useRef<number | null>(null);
  const pendingCommitTimerRef = useRef<number | null>(null);

  // Saved projects collection in LocalStorage
  const [savedProjects, setSavedProjects] = useState<PosterProject[]>(() => {
    try {
      const str =
        localStorage.getItem(LOCAL_STORAGE_SAVED_KEY) ||
        localStorage.getItem('canvaposter_saved_projects');
      return str ? JSON.parse(str) : [];
    } catch {
      return [];
    }
  });

  // Custom user-designed templates collection in LocalStorage
  const [customTemplates, setCustomTemplates] = useState<PosterTemplate[]>(() => {
    try {
      const str = localStorage.getItem(LOCAL_STORAGE_CUSTOM_TEMPLATES_KEY);
      return str ? JSON.parse(str) : [];
    } catch {
      return [];
    }
  });

  const scheduleAutoSave = useCallback((projToSave: PosterProject) => {
    if (autoSaveTimerRef.current !== null) {
      window.clearTimeout(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = window.setTimeout(() => {
      autoSaveTimerRef.current = null;
      try {
        localStorage.setItem(LOCAL_STORAGE_CURRENT_KEY, JSON.stringify(projToSave));
      } catch {
        // Ignore storage quota errors gracefully
      }
    }, 600);
  }, []);

  useEffect(() => {
    const flushSave = () => {
      if (autoSaveTimerRef.current !== null) {
        window.clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
        try {
          localStorage.setItem(LOCAL_STORAGE_CURRENT_KEY, JSON.stringify(projectRef.current));
        } catch {}
      }
    };
    window.addEventListener('pagehide', flushSave);
    return () => {
      window.removeEventListener('pagehide', flushSave);
      if (autoSaveTimerRef.current !== null) window.clearTimeout(autoSaveTimerRef.current);
      if (pendingCommitTimerRef.current !== null) window.clearTimeout(pendingCommitTimerRef.current);
    };
  }, []);

  // Push new committed state to history (never blocks drag frames)
  const pushState = useCallback(
    (newProject: PosterProject) => {
      if (pendingCommitTimerRef.current !== null) {
        window.clearTimeout(pendingCommitTimerRef.current);
        pendingCommitTimerRef.current = null;
      }

      const currentIdx = historyIndexRef.current;
      const sliced = historyRef.current.slice(0, currentIdx + 1);
      const updated = [...sliced, newProject];
      if (updated.length > 25) updated.shift();
      const nextIndex = updated.length - 1;

      historyRef.current = updated;
      historyIndexRef.current = nextIndex;
      projectRef.current = newProject;

      setHistory(updated);
      setHistoryIndex(nextIndex);
      setProject(newProject);
      if (isSavedRef.current) setIsSaved(false);

      scheduleAutoSave(newProject);
    },
    [scheduleAutoSave]
  );

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (pendingCommitTimerRef.current !== null) {
      window.clearTimeout(pendingCommitTimerRef.current);
      pendingCommitTimerRef.current = null;
    }
    const idx = historyIndexRef.current;
    const committed = historyRef.current[idx];
    if (committed && projectRef.current !== committed) {
      projectRef.current = committed;
      setProject(committed);
      scheduleAutoSave(committed);
      return;
    }
    if (idx > 0) {
      const newIndex = idx - 1;
      const target = historyRef.current[newIndex];
      historyIndexRef.current = newIndex;
      projectRef.current = target;
      setHistoryIndex(newIndex);
      setProject(target);
      scheduleAutoSave(target);
    }
  }, [scheduleAutoSave]);

  const handleRedo = useCallback(() => {
    if (pendingCommitTimerRef.current !== null) {
      window.clearTimeout(pendingCommitTimerRef.current);
      pendingCommitTimerRef.current = null;
    }
    const idx = historyIndexRef.current;
    if (idx < historyRef.current.length - 1) {
      const newIndex = idx + 1;
      const target = historyRef.current[newIndex];
      historyIndexRef.current = newIndex;
      projectRef.current = target;
      setHistoryIndex(newIndex);
      setProject(target);
      scheduleAutoSave(target);
    }
  }, [scheduleAutoSave]);

  // Fit to screen calculation (mobile vs desktop)
  const handleFitToScreen = useCallback(() => {
    const cur = projectRef.current;
    const isMobile = window.innerWidth < 768;
    const availableW = isMobile
      ? Math.max(240, window.innerWidth - 28)
      : Math.max(320, window.innerWidth - 400);
    const availableH = isMobile
      ? Math.max(200, window.innerHeight - 305)
      : Math.max(300, window.innerHeight - 170);
    const scaleW = availableW / cur.width;
    const scaleH = availableH / cur.height;
    const bestFit = Math.min(scaleW, scaleH) * (isMobile ? 0.94 : 0.88);
    setZoom(Math.max(0.18, Math.min(1.5, Math.round(bestFit * 100) / 100)));
  }, [project.width, project.height]);

  const lastViewportWidthRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    handleFitToScreen();
  }, [handleFitToScreen]);

  useEffect(() => {
    const onResize = () => {
      const currentW = window.innerWidth;
      if (Math.abs(currentW - lastViewportWidthRef.current) > 20) {
        lastViewportWidthRef.current = currentW;
        handleFitToScreen();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [handleFitToScreen]);

  // Smooth studio startup: wait briefly for fonts & initial viewport fit before revealing canvas
  useEffect(() => {
    let cancelled = false;
    const minSplashDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 280);
    });
    const fontsReady =
      typeof document !== 'undefined' && 'fonts' in document
        ? Promise.race([
            document.fonts.ready.then(() => undefined),
            new Promise<void>((resolve) => window.setTimeout(resolve, 550))
          ])
        : Promise.resolve();

    Promise.all([minSplashDelay, fontsReady]).then(() => {
      if (cancelled) return;
      handleFitToScreen();
      requestAnimationFrame(() => {
        if (!cancelled) setIsStudioReady(true);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Save current project to collection
  const handleSaveToLocalStorage = useCallback(() => {
    const updated = {
      ...projectRef.current,
      updatedAt: Date.now()
    };
    setSavedProjects((prev) => {
      const existing = prev.findIndex((p) => p.id === updated.id);
      let list: PosterProject[];
      if (existing >= 0) {
        list = [...prev];
        list[existing] = updated;
      } else {
        list = [updated, ...prev];
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(list));
      } catch (err) {
        console.error('Storage full or error:', err);
      }
      return list;
    });
    setIsSaved(true);
  }, []);

  // Change Dimension
  const handleDimensionChange = useCallback(
    (w: number, h: number) => {
      const cur = projectRef.current;
      pushState({
        ...cur,
        width: w,
        height: h,
        updatedAt: Date.now()
      });
    },
    [pushState]
  );

  // Select Template
  const handleSelectTemplate = useCallback(
    (template: PosterTemplate) => {
      const updated: PosterProject = {
        id: `proj_${Date.now()}`,
        title: template.titleSwahili,
        width: template.width,
        height: template.height,
        background: JSON.parse(JSON.stringify(template.background)),
        elements: JSON.parse(JSON.stringify(template.elements)),
        colorEffect: template.colorEffect || 'none',
        watermark: template.watermark
          ? JSON.parse(JSON.stringify(template.watermark))
          : projectRef.current.watermark,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setSelectedId(null);
      setEditingTextId(null);
      pushState(updated);
    },
    [pushState]
  );

  // Commit pending live interaction (drag, resize, rotate, blur) to undo history
  const handleCommitEdit = useCallback(() => {
    if (pendingCommitTimerRef.current !== null) {
      window.clearTimeout(pendingCommitTimerRef.current);
      pendingCommitTimerRef.current = null;
    }
    const latest = projectRef.current;
    const committed = historyRef.current[historyIndexRef.current];
    if (latest && latest !== committed) {
      pushState(latest);
    }
  }, [pushState]);

  // Element Actions (supports zero-lag transient live updates when commit=false)
  const handleUpdateElement = useCallback(
    (updated: Partial<PosterElement>, commit: boolean = true) => {
      const selId = selectedIdRef.current;
      if (!selId) return;
      const cur = projectRef.current;
      const newElements = cur.elements.map((el) =>
        el.id === selId ? ({ ...el, ...updated } as PosterElement) : el
      );
      const newProject: PosterProject = { ...cur, elements: newElements, updatedAt: Date.now() };

      if (commit) {
        pushState(newProject);
        return;
      }

      projectRef.current = newProject;
      setProject(newProject);
      if (isSavedRef.current) setIsSaved(false);

      if (pendingCommitTimerRef.current !== null) {
        window.clearTimeout(pendingCommitTimerRef.current);
      }
      pendingCommitTimerRef.current = window.setTimeout(() => {
        pendingCommitTimerRef.current = null;
        const latest = projectRef.current;
        if (latest !== historyRef.current[historyIndexRef.current]) {
          pushState(latest);
        }
      }, 550);
    },
    [pushState]
  );

  const noticeTimerRef = useRef<number | null>(null);
  const showNotice = useCallback((message: string, canUndo: boolean = false) => {
    if (noticeTimerRef.current !== null) {
      window.clearTimeout(noticeTimerRef.current);
    }
    setStudioNotice({ message, canUndo });
    noticeTimerRef.current = window.setTimeout(() => {
      noticeTimerRef.current = null;
      setStudioNotice(null);
    }, canUndo ? 4500 : 3400);
  }, []);

  const handleDeleteElement = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      if (!cur.elements.some((el) => el.id === id)) return;
      const newElements = cur.elements.filter((el) => el.id !== id);
      const newProject = { ...cur, elements: newElements, updatedAt: Date.now() };
      if (selectedIdRef.current === id) setSelectedId(null);
      if (editingTextIdRef.current === id) setEditingTextId(null);
      pushState(newProject);
      showNotice('Kipengele kimefutwa', true);
    },
    [pushState, showNotice]
  );

  const handleDeleteMultipleElements = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;
      const idSet = new Set(ids);
      const cur = projectRef.current;
      const newElements = cur.elements.filter((el) => !idSet.has(el.id));
      const newProject = { ...cur, elements: newElements, updatedAt: Date.now() };
      if (selectedIdRef.current && idSet.has(selectedIdRef.current)) setSelectedId(null);
      if (editingTextIdRef.current && idSet.has(editingTextIdRef.current)) setEditingTextId(null);
      pushState(newProject);
      showNotice(`Vipengele ${ids.length} vimefutwa`, true);
    },
    [pushState, showNotice]
  );

  const handleClearAllElements = useCallback(() => {
    const cur = projectRef.current;
    if (cur.elements.length === 0) return;
    setSelectedId(null);
    setEditingTextId(null);
    pushState({ ...cur, elements: [], updatedAt: Date.now() });
    showNotice('Vipengele vyote vimefutwa', true);
  }, [pushState, showNotice]);

  const handleDuplicateElement = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      const target = cur.elements.find((el) => el.id === id);
      if (!target) return;
      const duplicate: PosterElement = {
        ...JSON.parse(JSON.stringify(target)),
        id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        x: target.x + 20,
        y: target.y + 20
      };
      const newProject = {
        ...cur,
        elements: [...cur.elements, duplicate],
        updatedAt: Date.now()
      };
      pushState(newProject);
      setSelectedId(duplicate.id);
    },
    [pushState]
  );

  // Global Keyboard Shortcuts (Undo, Redo, Duplicate, Delete, Nudge)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        if (selectedIdRef.current) {
          e.preventDefault();
          handleDuplicateElement(selectedIdRef.current);
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIdRef.current && !editingTextIdRef.current) {
          e.preventDefault();
          handleDeleteElement(selectedIdRef.current);
        }
      } else if (
        selectedIdRef.current &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)
      ) {
        const sel = projectRef.current.elements.find((el) => el.id === selectedIdRef.current);
        if (!sel || sel.isLocked) return;
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
        const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
        handleUpdateElement({ x: sel.x + dx, y: sel.y + dy }, false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleDeleteElement, handleDuplicateElement, handleUpdateElement]);

  const handleBringForward = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      const idx = cur.elements.findIndex((el) => el.id === id);
      if (idx < 0 || idx >= cur.elements.length - 1) return;
      const newElements = [...cur.elements];
      const temp = newElements[idx];
      newElements[idx] = newElements[idx + 1];
      newElements[idx + 1] = temp;
      pushState({ ...cur, elements: newElements });
    },
    [pushState]
  );

  const handleSendBackward = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      const idx = cur.elements.findIndex((el) => el.id === id);
      if (idx <= 0) return;
      const newElements = [...cur.elements];
      const temp = newElements[idx];
      newElements[idx] = newElements[idx - 1];
      newElements[idx - 1] = temp;
      pushState({ ...cur, elements: newElements });
    },
    [pushState]
  );

  const handleBringToFront = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      const target = cur.elements.find((el) => el.id === id);
      if (!target) return;
      const filtered = cur.elements.filter((el) => el.id !== id);
      pushState({ ...cur, elements: [...filtered, target] });
    },
    [pushState]
  );

  const handleSendToBack = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      const target = cur.elements.find((el) => el.id === id);
      if (!target) return;
      const filtered = cur.elements.filter((el) => el.id !== id);
      pushState({ ...cur, elements: [target, ...filtered] });
    },
    [pushState]
  );

  // Add Elements
  const handleAddText = useCallback(
    (
      text: string,
      fontSize: number,
      fontWeight: string | number,
      fontFamily: string,
      color: string,
      extra?: Partial<TextElement>
    ) => {
      const cur = projectRef.current;
      const newEl: TextElement = {
        id: `text_${Date.now()}`,
        type: 'text',
        text,
        fontSize,
        fontWeight,
        fontFamily,
        color,
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        x: Math.round(cur.width / 2 - 250),
        y: Math.round(cur.height / 2 - 40),
        width: 500,
        height: 90,
        rotation: 0,
        opacity: 1,
        ...extra
      };
      pushState({ ...cur, elements: [...cur.elements, newEl] });
      setSelectedId(newEl.id);
    },
    [pushState]
  );

  const handleAddShape = useCallback(
    (shapeType: ShapeType, fill: string, stroke?: string) => {
      const cur = projectRef.current;
      const shapeDef = SHAPES_100_MAP[shapeType];
      const isFrame = shapeType === 'frame-border';
      const w = isFrame
        ? Math.round(cur.width * 0.88)
        : shapeDef?.defaultWidth
          ? shapeDef.defaultWidth
          : 210;
      const h = isFrame
        ? Math.round(cur.height * 0.88)
        : shapeDef?.defaultHeight
          ? shapeDef.defaultHeight
          : 210;

      const newEl: PosterElement = {
        id: `shape_${Date.now()}`,
        type: 'shape',
        shapeType,
        fillColor: fill,
        strokeColor: stroke,
        strokeWidth: isFrame ? 8 : stroke ? 2 : 0,
        borderRadius: shapeType === 'rectangle' || isFrame ? 12 : 0,
        x: Math.round(cur.width / 2 - w / 2),
        y: Math.round(cur.height / 2 - h / 2),
        width: w,
        height: h,
        rotation: 0,
        opacity: 1
      };
      pushState({ ...cur, elements: [...cur.elements, newEl] });
      setSelectedId(newEl.id);
    },
    [pushState]
  );

  const handleAddBadge = useCallback(
    (text: string, secondaryText: string | undefined, bgColor: string, textColor: string) => {
      const cur = projectRef.current;
      const newEl: PosterElement = {
        id: `badge_${Date.now()}`,
        type: 'badge',
        text,
        secondaryText,
        badgeStyle: 'pill',
        bgColor,
        textColor,
        fontSize: 16,
        x: Math.round(cur.width / 2 - 220),
        y: Math.round(cur.height / 2 - 28),
        width: 440,
        height: 56,
        rotation: 0,
        opacity: 1
      };
      pushState({ ...cur, elements: [...cur.elements, newEl] });
      setSelectedId(newEl.id);
    },
    [pushState]
  );

  const handleAddImage = useCallback(
    (src: string, w: number = 400, h: number = 300, extra?: Partial<ImageElement>) => {
      const cur = projectRef.current;
      const newEl: PosterElement = {
        id: `img_${Date.now()}`,
        type: 'image',
        src,
        x: Math.round(cur.width / 2 - w / 2),
        y: Math.round(cur.height / 2 - h / 2),
        width: w,
        height: h,
        borderRadius: 16,
        rotation: 0,
        opacity: 1,
        ...extra
      };
      pushState({ ...cur, elements: [...cur.elements, newEl] });
      setSelectedId(newEl.id);
    },
    [pushState]
  );

  const handleAddTextCard = useCallback(
    (opts: {
      title: string;
      body: string;
      cardBg: string;
      textColor: string;
      accentColor: string;
      borderRadius: number;
      hasAccentBar?: boolean;
    }) => {
      const cur = projectRef.current;
      const cardW = Math.min(Math.round(cur.width * 0.84), 760);
      const cardH = Math.min(Math.round(cur.height * 0.34), 340);
      const cardX = Math.round(cur.width / 2 - cardW / 2);
      const cardY = Math.round(cur.height / 2 - cardH / 2);
      const ts = Date.now();

      const cardBox: ShapeElement = {
        id: `card_box_${ts}`,
        type: 'shape',
        shapeType: 'rectangle',
        x: cardX,
        y: cardY,
        width: cardW,
        height: cardH,
        fillColor: opts.cardBg,
        borderRadius: opts.borderRadius,
        shadowColor: 'rgba(0,0,0,0.28)',
        shadowBlur: 22,
        rotation: 0,
        opacity: 1
      };

      const newElements: PosterElement[] = [cardBox];

      if (opts.hasAccentBar !== false) {
        newElements.push({
          id: `card_accent_${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: cardX + 24,
          y: cardY + 26,
          width: 8,
          height: cardH - 52,
          fillColor: opts.accentColor,
          borderRadius: 4,
          rotation: 0,
          opacity: 1
        });
      }

      const contentLeft = cardX + (opts.hasAccentBar !== false ? 52 : 34);
      const contentW = cardW - (opts.hasAccentBar !== false ? 84 : 68);

      const titleEl: TextElement = {
        id: `card_title_${ts}`,
        type: 'text',
        text: opts.title || 'KICHWA CHA KADI',
        x: contentLeft,
        y: cardY + 32,
        width: contentW,
        height: 44,
        fontSize: Math.max(22, Math.round(cardW * 0.04)),
        fontFamily: 'Outfit',
        fontWeight: 800,
        color: opts.accentColor === opts.cardBg ? opts.textColor : opts.accentColor,
        textAlign: 'left',
        lineHeight: 1.2,
        letterSpacing: 0.5,
        rotation: 0,
        opacity: 1
      };

      const bodyEl: TextElement = {
        id: `card_body_${ts}`,
        type: 'text',
        text: opts.body || 'Andika maelezo yako hapa...',
        x: contentLeft,
        y: cardY + 86,
        width: contentW,
        height: cardH - 114,
        fontSize: Math.max(18, Math.round(cardW * 0.032)),
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 600,
        color: opts.textColor,
        textAlign: 'left',
        lineHeight: 1.38,
        letterSpacing: 0,
        rotation: 0,
        opacity: 1
      };

      newElements.push(titleEl, bodyEl);
      pushState({ ...cur, elements: [...cur.elements, ...newElements] });
      setSelectedId(bodyEl.id);
    },
    [pushState]
  );

  const handleAddQrCode = useCallback(
    (
      data: string,
      label?: string,
      qrColor: string = '#000000',
      bgColor: string = '#ffffff'
    ) => {
      const cur = projectRef.current;
      const newEl: PosterElement = {
        id: `qr_${Date.now()}`,
        type: 'qrcode',
        data,
        label,
        qrColor,
        bgColor,
        x: Math.round(cur.width / 2 - 60),
        y: Math.round(cur.height - 180),
        width: 120,
        height: 120,
        rotation: 0,
        opacity: 1
      };
      pushState({ ...cur, elements: [...cur.elements, newEl] });
      setSelectedId(newEl.id);
    },
    [pushState]
  );

  // Add Chart Element
  const handleAddChart = useCallback(
    (chartType: ChartType, title?: string) => {
      const cur = projectRef.current;
      let initialData = [
        { label: 'Q1', value: 45, secondaryValue: 20 },
        { label: 'Q2', value: 72, secondaryValue: 32 },
        { label: 'Q3', value: 95, secondaryValue: 40 },
        { label: 'Q4', value: 128, secondaryValue: 55 }
      ];
      if (chartType === 'pie' || chartType === 'donut' || chartType === 'semi-donut') {
        initialData = [
          { label: 'Bidhaa A', value: 55, secondaryValue: 20 },
          { label: 'Bidhaa B', value: 25, secondaryValue: 15 },
          { label: 'Bidhaa C', value: 20, secondaryValue: 10 }
        ];
      } else if (chartType === 'funnel') {
        initialData = [
          { label: 'Wageni', value: 1000, secondaryValue: 0 },
          { label: 'Waliouliza', value: 640, secondaryValue: 0 },
          { label: 'Oda', value: 380, secondaryValue: 0 },
          { label: 'Malipo', value: 240, secondaryValue: 0 }
        ];
      } else if (chartType === 'radar') {
        initialData = [
          { label: 'Ubora', value: 92, secondaryValue: 0 },
          { label: 'Bei', value: 78, secondaryValue: 0 },
          { label: 'Kasi', value: 88, secondaryValue: 0 },
          { label: 'Huduma', value: 95, secondaryValue: 0 },
          { label: 'Ubunifu', value: 84, secondaryValue: 0 }
        ];
      }

      const newEl: ChartElement = {
        id: `chart_${Date.now()}`,
        type: 'chart',
        chartType,
        title: title || 'Takwimu & Grafu',
        subtitle: 'Muhtasari wa utendaji wa mwezi',
        data: initialData,
        colorPalette: ['#38bdf8', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'],
        showValues: true,
        showLegend: true,
        showGridlines: true,
        backgroundColor: '#0f172a',
        borderRadius: 18,
        borderColor: '#334155',
        borderWidth: 1.5,
        progressValue: 85,
        progressLabel: 'Lengo Limekamilika',
        kpiValue: '+148%',
        kpiLabel: 'Ukuaji wa Mwaka Huu',
        kpiTrend: 'up',
        x: Math.round(cur.width / 2 - 250),
        y: Math.round(cur.height / 2 - 130),
        width: 500,
        height: chartType === 'progress-bar' ? 160 : 260,
        rotation: 0,
        opacity: 1
      };
      pushState({ ...cur, elements: [...cur.elements, newEl] });
      setSelectedId(newEl.id);
    },
    [pushState]
  );

  const handleChangeBackground = useCallback(
    (bg: PosterBackground) => {
      pushState({ ...projectRef.current, background: bg, updatedAt: Date.now() });
    },
    [pushState]
  );

  const handleChangeColorEffect = useCallback(
    (colorEffect: ColorEffectPreset) => {
      pushState({ ...projectRef.current, colorEffect, updatedAt: Date.now() });
    },
    [pushState]
  );

  const handleChangeWatermark = useCallback(
    (watermark: WatermarkConfig, commit: boolean = true) => {
      const cur = projectRef.current;
      const updated = { ...cur, watermark, updatedAt: Date.now() };
      if (commit) {
        pushState(updated);
        return;
      }
      projectRef.current = updated;
      setProject(updated);
      if (isSavedRef.current) setIsSaved(false);
      if (pendingCommitTimerRef.current !== null) {
        window.clearTimeout(pendingCommitTimerRef.current);
      }
      pendingCommitTimerRef.current = window.setTimeout(() => {
        pendingCommitTimerRef.current = null;
        const latest = projectRef.current;
        if (latest !== historyRef.current[historyIndexRef.current]) {
          pushState(latest);
        }
      }, 500);
    },
    [pushState]
  );

  const handleNewBlankProject = () => {
    const blank: PosterProject = {
      id: `proj_${Date.now()}`,
      title: 'Bango Jipya - Malosha',
      width: 800,
      height: 1100,
      background: {
        type: 'color',
        color: '#0f172a'
      },
      elements: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setSelectedId(null);
    setEditingTextId(null);
    pushState(blank);
  };

  const handleOpenDownload = useCallback(() => setIsDownloadOpen(true), []);
  const handleOpenSavedProjects = useCallback(() => setIsSavedProjectsOpen(true), []);
  const handleOpenFirebaseHosting = useCallback(() => setIsFirebaseHostingOpen(true), []);
  const handleOpenHelp = useCallback(() => setIsHelpOpen(true), []);
  const handleOpenTemplatesTab = useCallback(() => {
    setActiveTab('templates');
    if (window.innerWidth < 768) {
      setIsMobileDrawerOpen(true);
    }
  }, []);
  const handleOpenMobileDrawer = useCallback((tab: SidebarTab) => {
    setActiveTab(tab);
    setIsMobileDrawerOpen(true);
  }, []);
  const handleOpenSidebarTool = useCallback(
    (tab: SidebarTab, subTab?: 'bg' | 'effects' | 'watermark') => {
      setActiveTab(tab);
      if (subTab) {
        setAppearanceSubTab(subTab);
      }
      if (window.innerWidth < 768) {
        setIsMobileDrawerOpen(true);
      }
    },
    []
  );
  const handleCloseMobileDrawer = useCallback(() => setIsMobileDrawerOpen(false), []);
  const handleToggleGrid = useCallback(() => setShowGrid((prev) => !prev), []);
  const handleTitleChange = useCallback(
    (t: string) => {
      const cur = projectRef.current;
      const updated = { ...cur, title: t };
      projectRef.current = updated;
      setProject(updated);
      if (isSavedRef.current) setIsSaved(false);
      scheduleAutoSave(updated);
    },
    [scheduleAutoSave]
  );
  const handleSelectElement = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id !== editingTextIdRef.current) setEditingTextId(null);
  }, []);
  const handleOpenChartModal = useCallback(() => setIsChartModalOpen(true), []);
  const handleRequestEditText = useCallback((id: string) => setEditingTextId(id), []);

  const handleCreateBlankCanvas = useCallback(
    (title: string, width: number, height: number, background: PosterBackground) => {
      const blank: PosterProject = {
        id: `proj_${Date.now()}`,
        title,
        width,
        height,
        background: JSON.parse(JSON.stringify(background)),
        elements: [],
        colorEffect: 'none',
        watermark: projectRef.current.watermark,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setSelectedId(null);
      setEditingTextId(null);
      pushState(blank);
      showNotice('Canvas mpya tupu ipo tayari kubuni!');
    },
    [pushState, showNotice]
  );

  const handleSaveAsTemplate = useCallback(
    (titleSwahili: string, category: TemplateCategory, description: string) => {
      const cur = projectRef.current;
      const catLabel =
        TEMPLATE_CATEGORY_FILTERS.find((c) => c.id === category)?.label || 'Kiolezo Changu';
      const newTemplate: PosterTemplate = {
        id: `custom_tpl_${Date.now()}`,
        title: titleSwahili,
        titleSwahili,
        category,
        categoryLabelSwahili: catLabel,
        description,
        width: cur.width,
        height: cur.height,
        background: JSON.parse(JSON.stringify(cur.background)),
        elements: JSON.parse(JSON.stringify(cur.elements)),
        colorEffect: cur.colorEffect || 'none',
        watermark: cur.watermark ? JSON.parse(JSON.stringify(cur.watermark)) : undefined,
        previewBadge: 'CHAKO',
        previewAccent: '#10b981',
        isCustom: true
      };
      setCustomTemplates((prev) => {
        const next = [newTemplate, ...prev];
        try {
          localStorage.setItem(LOCAL_STORAGE_CUSTOM_TEMPLATES_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage quota errors gracefully
        }
        return next;
      });
      setActiveTab('templates');
      showNotice('Kiolezo chako kimeongezwa kwenye orodha ya Violezo!');
    },
    [showNotice]
  );

  const handleDeleteCustomTemplate = useCallback((id: string) => {
    setCustomTemplates((prev) => {
      const next = prev.filter((t) => t.id !== id);
      try {
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_TEMPLATES_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const handleToggleLockElement = useCallback(
    (id: string) => {
      const cur = projectRef.current;
      const updated = {
        ...cur,
        elements: cur.elements.map((el) =>
          el.id === id ? ({ ...el, isLocked: !el.isLocked } as PosterElement) : el
        ),
        updatedAt: Date.now()
      };
      pushState(updated);
    },
    [pushState]
  );

  const handleQuickStartFromEmptyCanvas = useCallback(
    (tab: 'text' | 'photos' | 'shapes' | 'charts' | 'logos') => {
      setActiveTab(tab);
      if (window.innerWidth < 768) {
        setIsMobileDrawerOpen(true);
      }
    },
    []
  );

  const handleOpenNewBlankModal = useCallback(() => setIsNewBlankModalOpen(true), []);
  const handleOpenSaveAsTemplateModal = useCallback(() => setIsSaveAsTemplateOpen(true), []);
  const handleOpenLayersModal = useCallback(() => setIsLayersModalOpen(true), []);

  const handleAddVerifiedBadge = useCallback(
    (color: string = '#1d9bf0') => {
      handleAddShape('verified-badge', color);
    },
    [handleAddShape]
  );

  const handleReplaceSelectedWithPhoto = useCallback(
    (src: string, asCircle?: boolean) => {
      const selId = selectedIdRef.current;
      if (!selId) return;
      const sel = projectRef.current.elements.find((el) => el.id === selId);
      if (!sel) return;
      if (sel.type === 'image') {
        if (asCircle) {
          const sq = Math.max(80, Math.min(sel.width, sel.height));
          handleUpdateElement({
            src,
            cropRect: undefined,
            borderRadius: 999,
            width: sq,
            height: sq
          } as Partial<PosterElement>);
        } else {
          handleUpdateElement({
            src,
            cropRect: undefined,
            borderRadius: asCircle === false ? 12 : (sel as ImageElement).borderRadius
          } as Partial<PosterElement>);
        }
      } else if (sel.type === 'shape') {
        const sh = sel as ShapeElement;
        const makeCircle = asCircle ?? sh.shapeType === 'circle';
        const sq = Math.max(80, Math.min(sh.width, sh.height));
        handleUpdateElement({
          type: 'image',
          src,
          cropRect: undefined,
          borderRadius: makeCircle ? 999 : sh.borderRadius || 12,
          ...(makeCircle ? { width: sq, height: sq } : {})
        } as Partial<PosterElement>);
      }
    },
    [handleUpdateElement]
  );

  const selectedElement = project.elements.find((el) => el.id === selectedId) || null;
  const selectedChart = selectedElement?.type === 'chart' ? (selectedElement as ChartElement) : null;

  return (
    <div className="flex flex-col h-[100dvh] w-screen bg-neutral-950 text-neutral-100 overflow-hidden overscroll-none font-sans">
      {/* 1. Header */}
      <Header
        onOpenDownload={handleOpenDownload}
        onOpenSavedProjects={handleOpenSavedProjects}
        onOpenFirebaseHosting={handleOpenFirebaseHosting}
        onOpenTemplatesTab={handleOpenTemplatesTab}
        onOpenHelp={handleOpenHelp}
        onOpenSidebarTool={handleOpenSidebarTool}
        onOpenNewBlankModal={handleOpenNewBlankModal}
        onOpenSaveAsTemplateModal={handleOpenSaveAsTemplateModal}
      />

      {/* 2. Workspace Sub-Toolbar */}
      <WorkspaceToolbar
        title={project.title}
        onTitleChange={handleTitleChange}
        width={project.width}
        height={project.height}
        onDimensionChange={handleDimensionChange}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        zoom={zoom}
        onZoomChange={setZoom}
        onFitToScreen={handleFitToScreen}
        showGrid={showGrid}
        onToggleGrid={handleToggleGrid}
        isSaved={isSaved}
        onSaveToLocalStorage={handleSaveToLocalStorage}
        onOpenNewBlankModal={handleOpenNewBlankModal}
        onOpenSaveAsTemplateModal={handleOpenSaveAsTemplateModal}
        onOpenLayersModal={handleOpenLayersModal}
        elementCount={project.elements.length}
      />

      {/* 3. Secondary Contextual Property Toolbar */}
      <PropertyToolbar
        selectedElement={selectedElement}
        canvasWidth={project.width}
        canvasHeight={project.height}
        elementCount={project.elements.length}
        hasBackgroundImage={project.background.type === 'image'}
        hasWatermark={Boolean(project.watermark?.enabled && project.watermark.text?.trim())}
        hasColorEffect={Boolean(project.colorEffect && project.colorEffect !== 'none')}
        onChangeBackground={handleChangeBackground}
        onClearWatermark={() =>
          handleChangeWatermark({ ...(project.watermark || DEFAULT_WATERMARK), enabled: false })
        }
        onClearColorEffect={() => handleChangeColorEffect('none')}
        onOpenLayersModal={handleOpenLayersModal}
        onAddVerifiedBadge={handleAddVerifiedBadge}
        onUpdateElement={handleUpdateElement}
        onDeleteElement={handleDeleteElement}
        onDuplicateElement={handleDuplicateElement}
        onBringForward={handleBringForward}
        onSendBackward={handleSendBackward}
        onBringToFront={handleBringToFront}
        onSendToBack={handleSendToBack}
        onOpenChartModal={handleOpenChartModal}
        onRequestEditText={handleRequestEditText}
      />

      {/* 4. Main Body: Left Sidebar (Desktop) / Bottom Dock (Mobile) + Interactive Canvas */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          appearanceSubTab={appearanceSubTab}
          onAppearanceSubTabChange={setAppearanceSubTab}
          isMobileDrawerOpen={isMobileDrawerOpen}
          onOpenMobileDrawer={handleOpenMobileDrawer}
          onCloseMobileDrawer={handleCloseMobileDrawer}
          onSelectTemplate={handleSelectTemplate}
          onAddText={handleAddText}
          onAddShape={handleAddShape}
          onAddBadge={handleAddBadge}
          onAddImage={handleAddImage}
          onAddTextCard={handleAddTextCard}
          onAddQrCode={handleAddQrCode}
          onAddChart={handleAddChart}
          onToggleGrid={handleToggleGrid}
          currentBackground={project.background}
          onChangeBackground={handleChangeBackground}
          currentColorEffect={project.colorEffect || 'none'}
          onChangeColorEffect={handleChangeColorEffect}
          currentWatermark={project.watermark || DEFAULT_WATERMARK}
          onChangeWatermark={handleChangeWatermark}
          hasSelectedImageOrShape={
            selectedElement?.type === 'image' || selectedElement?.type === 'shape'
          }
          onReplaceSelectedWithPhoto={handleReplaceSelectedWithPhoto}
          onAddVerifiedBadge={handleAddVerifiedBadge}
          customTemplates={customTemplates}
          onOpenNewBlankModal={handleOpenNewBlankModal}
          onOpenSaveAsTemplateModal={handleOpenSaveAsTemplateModal}
          onDeleteCustomTemplate={handleDeleteCustomTemplate}
          onOpenLayersModal={handleOpenLayersModal}
        />

        <CanvasArea
          project={project}
          selectedId={selectedId}
          onSelectElement={handleSelectElement}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
          onDuplicateElement={handleDuplicateElement}
          onToggleLockElement={handleToggleLockElement}
          onCommitEdit={handleCommitEdit}
          zoom={zoom}
          showGrid={showGrid}
          editingTextId={editingTextId}
          onEditingTextIdChange={setEditingTextId}
          onQuickStartAction={handleQuickStartFromEmptyCanvas}
        />
      </div>

      {/* Studio Toast Notification */}
      {studioNotice && (
        <div className="fixed bottom-28 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-emerald-500/60 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span>{studioNotice.message}</span>
          {studioNotice.canUndo && (
            <button
              type="button"
              onClick={() => {
                handleUndo();
                setStudioNotice(null);
              }}
              className="px-2.5 py-0.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-[11px] cursor-pointer transition-colors"
            >
              Tendua (Undo)
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <NewCanvasModal
        isOpen={isNewBlankModalOpen}
        onClose={() => setIsNewBlankModalOpen(false)}
        onCreateBlankCanvas={handleCreateBlankCanvas}
      />

      <SaveAsTemplateModal
        isOpen={isSaveAsTemplateOpen}
        onClose={() => setIsSaveAsTemplateOpen(false)}
        defaultTitle={project.title}
        elementCount={project.elements.length}
        width={project.width}
        height={project.height}
        onSaveTemplate={handleSaveAsTemplate}
      />

      <LayersModal
        isOpen={isLayersModalOpen}
        onClose={() => setIsLayersModalOpen(false)}
        project={project}
        selectedId={selectedId}
        onSelectElement={handleSelectElement}
        onBringForward={handleBringForward}
        onSendBackward={handleSendBackward}
        onToggleLock={handleToggleLockElement}
        onDuplicateElement={handleDuplicateElement}
        onDeleteElement={handleDeleteElement}
        onDeleteMultiple={handleDeleteMultipleElements}
        onClearAllElements={handleClearAllElements}
        onClearBackgroundImage={() => handleChangeBackground({ type: 'color', color: '#0f172a' })}
        onClearWatermark={() =>
          handleChangeWatermark({ ...(project.watermark || DEFAULT_WATERMARK), enabled: false })
        }
        onClearColorEffect={() => handleChangeColorEffect('none')}
      />

      <DownloadModal
        project={project}
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      <SavedProjectsModal
        isOpen={isSavedProjectsOpen}
        onClose={() => setIsSavedProjectsOpen(false)}
        savedProjects={savedProjects}
        onLoadProject={(p) => {
          setSelectedId(null);
          setEditingTextId(null);
          pushState(p);
        }}
        onDeleteProject={(id) => {
          const filtered = savedProjects.filter((p) => p.id !== id);
          setSavedProjects(filtered);
          try {
            localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(filtered));
          } catch {}
        }}
        onImportProject={(p) => {
          setSelectedId(null);
          setEditingTextId(null);
          pushState(p);
        }}
        onNewBlankProject={() => setIsNewBlankModalOpen(true)}
      />

      <ChartDataModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
        chart={selectedChart}
        onSaveChart={(updated) => handleUpdateElement(updated)}
      />

      <FirebaseHostingModal
        isOpen={isFirebaseHostingOpen}
        onClose={() => setIsFirebaseHostingOpen(false)}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Automatic Mobile App Install Notification & Offline Indicator */}
      <PWAInstallBanner />
      <OfflineIndicator />

      {/* Branded Startup Loading Screen */}
      <LoadingScreen isReady={isStudioReady} />
    </div>
  );
}
