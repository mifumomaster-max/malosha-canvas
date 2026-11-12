import React, { useState, useEffect, useCallback } from 'react';
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
import {
  PosterProject,
  PosterElement,
  TextElement,
  ChartElement,
  ChartType,
  PosterTemplate,
  PosterBackground,
  ShapeType
} from './types/poster';
import { DEFAULT_TEMPLATES } from './data/defaultTemplates';

const LOCAL_STORAGE_SAVED_KEY = 'malosha_saved_projects';
const LOCAL_STORAGE_CURRENT_KEY = 'malosha_current_project';

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

  // Sidebar Tab
  const [activeTab, setActiveTab] = useState<SidebarTab>('templates');

  // Modals
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [isSavedProjectsOpen, setIsSavedProjectsOpen] = useState<boolean>(false);
  const [isFirebaseHostingOpen, setIsFirebaseHostingOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState<boolean>(false);

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

  // Push new state to history
  const pushState = useCallback(
    (newProject: PosterProject) => {
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        const updated = [...sliced, newProject];
        if (updated.length > 25) updated.shift();
        return updated;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 24));
      setProject(newProject);
      setIsSaved(false);

      try {
        localStorage.setItem(LOCAL_STORAGE_CURRENT_KEY, JSON.stringify(newProject));
      } catch {
        // Storage error
      }
    },
    [historyIndex]
  );

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setProject(history[newIndex]);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setProject(history[newIndex]);
    }
  }, [historyIndex, history]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          e.preventDefault();
          handleDeleteElement(selectedId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedId]);

  // Fit to screen calculation
  const handleFitToScreen = useCallback(() => {
    const availableW = window.innerWidth - 380;
    const availableH = window.innerHeight - 160;
    const scaleW = availableW / project.width;
    const scaleH = availableH / project.height;
    const bestFit = Math.min(scaleW, scaleH) * 0.88;
    setZoom(Math.max(0.25, Math.min(1.5, Math.round(bestFit * 100) / 100)));
  }, [project.width, project.height]);

  useEffect(() => {
    handleFitToScreen();
  }, [handleFitToScreen]);

  // Save current project to collection
  const handleSaveToLocalStorage = () => {
    const updated = {
      ...project,
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
  };

  // Change Dimension
  const handleDimensionChange = (w: number, h: number) => {
    const updated: PosterProject = {
      ...project,
      width: w,
      height: h,
      updatedAt: Date.now()
    };
    pushState(updated);
  };

  // Select Template
  const handleSelectTemplate = (template: PosterTemplate) => {
    const updated: PosterProject = {
      id: `proj_${Date.now()}`,
      title: template.titleSwahili,
      width: template.width,
      height: template.height,
      background: JSON.parse(JSON.stringify(template.background)),
      elements: JSON.parse(JSON.stringify(template.elements)),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setSelectedId(null);
    pushState(updated);
  };

  // Element Actions
  const handleUpdateElement = (updated: Partial<PosterElement>) => {
    if (!selectedId) return;
    const newElements = project.elements.map((el) => {
      if (el.id === selectedId) {
        return { ...el, ...updated } as PosterElement;
      }
      return el;
    });
    const newProject = { ...project, elements: newElements, updatedAt: Date.now() };
    pushState(newProject);
  };

  const handleDeleteElement = (id: string) => {
    const newElements = project.elements.filter((el) => el.id !== id);
    const newProject = { ...project, elements: newElements, updatedAt: Date.now() };
    setSelectedId(null);
    pushState(newProject);
  };

  const handleDuplicateElement = (id: string) => {
    const target = project.elements.find((el) => el.id === id);
    if (!target) return;
    const duplicate: PosterElement = {
      ...JSON.parse(JSON.stringify(target)),
      id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      x: target.x + 20,
      y: target.y + 20
    };
    const newProject = {
      ...project,
      elements: [...project.elements, duplicate],
      updatedAt: Date.now()
    };
    pushState(newProject);
    setSelectedId(duplicate.id);
  };

  const handleBringForward = (id: string) => {
    const idx = project.elements.findIndex((el) => el.id === id);
    if (idx < 0 || idx >= project.elements.length - 1) return;
    const newElements = [...project.elements];
    const temp = newElements[idx];
    newElements[idx] = newElements[idx + 1];
    newElements[idx + 1] = temp;
    pushState({ ...project, elements: newElements });
  };

  const handleSendBackward = (id: string) => {
    const idx = project.elements.findIndex((el) => el.id === id);
    if (idx <= 0) return;
    const newElements = [...project.elements];
    const temp = newElements[idx];
    newElements[idx] = newElements[idx - 1];
    newElements[idx - 1] = temp;
    pushState({ ...project, elements: newElements });
  };

  const handleBringToFront = (id: string) => {
    const target = project.elements.find((el) => el.id === id);
    if (!target) return;
    const filtered = project.elements.filter((el) => el.id !== id);
    pushState({ ...project, elements: [...filtered, target] });
  };

  const handleSendToBack = (id: string) => {
    const target = project.elements.find((el) => el.id === id);
    if (!target) return;
    const filtered = project.elements.filter((el) => el.id !== id);
    pushState({ ...project, elements: [target, ...filtered] });
  };

  // Add Elements
  const handleAddText = (
    text: string,
    fontSize: number,
    fontWeight: string | number,
    fontFamily: string,
    color: string,
    extra?: Partial<TextElement>
  ) => {
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
      x: Math.round(project.width / 2 - 250),
      y: Math.round(project.height / 2 - 40),
      width: 500,
      height: 90,
      rotation: 0,
      opacity: 1,
      ...extra
    };
    pushState({ ...project, elements: [...project.elements, newEl] });
    setSelectedId(newEl.id);
  };

  const handleAddShape = (shapeType: ShapeType, fill: string, stroke?: string) => {
    const size =
      shapeType === 'circle' || shapeType === 'star' || shapeType === 'heart' ? 200 : 250;
    const newEl: PosterElement = {
      id: `shape_${Date.now()}`,
      type: 'shape',
      shapeType,
      fillColor: fill,
      strokeColor: stroke,
      strokeWidth: stroke ? 2 : 0,
      borderRadius: shapeType === 'rectangle' ? 12 : 0,
      x: Math.round(project.width / 2 - size / 2),
      y: Math.round(project.height / 2 - size / 2),
      width: size,
      height: shapeType === 'line' ? 8 : shapeType === 'arrow' ? 80 : size,
      rotation: 0,
      opacity: 1
    };
    pushState({ ...project, elements: [...project.elements, newEl] });
    setSelectedId(newEl.id);
  };

  const handleAddBadge = (
    text: string,
    secondaryText: string | undefined,
    bgColor: string,
    textColor: string
  ) => {
    const newEl: PosterElement = {
      id: `badge_${Date.now()}`,
      type: 'badge',
      text,
      secondaryText,
      badgeStyle: 'pill',
      bgColor,
      textColor,
      fontSize: 16,
      x: Math.round(project.width / 2 - 220),
      y: Math.round(project.height / 2 - 28),
      width: 440,
      height: 56,
      rotation: 0,
      opacity: 1
    };
    pushState({ ...project, elements: [...project.elements, newEl] });
    setSelectedId(newEl.id);
  };

  const handleAddImage = (src: string, w: number = 400, h: number = 300) => {
    const newEl: PosterElement = {
      id: `img_${Date.now()}`,
      type: 'image',
      src,
      x: Math.round(project.width / 2 - w / 2),
      y: Math.round(project.height / 2 - h / 2),
      width: w,
      height: h,
      borderRadius: 16,
      rotation: 0,
      opacity: 1
    };
    pushState({ ...project, elements: [...project.elements, newEl] });
    setSelectedId(newEl.id);
  };

  const handleAddQrCode = (
    data: string,
    label?: string,
    qrColor: string = '#000000',
    bgColor: string = '#ffffff'
  ) => {
    const newEl: PosterElement = {
      id: `qr_${Date.now()}`,
      type: 'qrcode',
      data,
      label,
      qrColor,
      bgColor,
      x: Math.round(project.width / 2 - 60),
      y: Math.round(project.height - 180),
      width: 120,
      height: 120,
      rotation: 0,
      opacity: 1
    };
    pushState({ ...project, elements: [...project.elements, newEl] });
    setSelectedId(newEl.id);
  };

  // Add Chart Element
  const handleAddChart = (chartType: ChartType, title?: string) => {
    let initialData = [
      { label: 'Q1', value: 45 },
      { label: 'Q2', value: 72 },
      { label: 'Q3', value: 95 },
      { label: 'Q4', value: 128 }
    ];
    if (chartType === 'pie' || chartType === 'donut') {
      initialData = [
        { label: 'Bidhaa A', value: 55 },
        { label: 'Bidhaa B', value: 25 },
        { label: 'Bidhaa C', value: 20 }
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
      backgroundColor: '#0f172a',
      borderRadius: 18,
      borderColor: '#334155',
      borderWidth: 1.5,
      progressValue: 85,
      progressLabel: 'Lengo Limekamilika',
      kpiValue: '+148%',
      kpiLabel: 'Ukuaji wa Mwaka Huu',
      x: Math.round(project.width / 2 - 250),
      y: Math.round(project.height / 2 - 130),
      width: 500,
      height: 260,
      rotation: 0,
      opacity: 1
    };
    pushState({ ...project, elements: [...project.elements, newEl] });
    setSelectedId(newEl.id);
  };

  const handleChangeBackground = (bg: PosterBackground) => {
    pushState({ ...project, background: bg });
  };

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
    pushState(blank);
  };

  const selectedElement = project.elements.find((el) => el.id === selectedId) || null;
  const selectedChart = selectedElement?.type === 'chart' ? (selectedElement as ChartElement) : null;

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      {/* 1. Header */}
      <Header
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenSavedProjects={() => setIsSavedProjectsOpen(true)}
        onOpenFirebaseHosting={() => setIsFirebaseHostingOpen(true)}
        onOpenTemplatesTab={() => setActiveTab('templates')}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* 2. Workspace Sub-Toolbar */}
      <WorkspaceToolbar
        title={project.title}
        onTitleChange={(t) => pushState({ ...project, title: t })}
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
        onToggleGrid={() => setShowGrid(!showGrid)}
        isSaved={isSaved}
        onSaveToLocalStorage={handleSaveToLocalStorage}
      />

      {/* 3. Secondary Contextual Property Toolbar */}
      <PropertyToolbar
        selectedElement={selectedElement}
        onUpdateElement={handleUpdateElement}
        onDeleteElement={handleDeleteElement}
        onDuplicateElement={handleDuplicateElement}
        onBringForward={handleBringForward}
        onSendBackward={handleSendBackward}
        onBringToFront={handleBringToFront}
        onSendToBack={handleSendToBack}
        onOpenChartModal={() => setIsChartModalOpen(true)}
      />

      {/* 4. Main Body: Left Sidebar + Center Interactive Canvas */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSelectTemplate={handleSelectTemplate}
          onAddText={handleAddText}
          onAddShape={handleAddShape}
          onAddBadge={handleAddBadge}
          onAddImage={handleAddImage}
          onAddQrCode={handleAddQrCode}
          onAddChart={handleAddChart}
          currentBackground={project.background}
          onChangeBackground={handleChangeBackground}
        />

        <CanvasArea
          project={project}
          selectedId={selectedId}
          onSelectElement={setSelectedId}
          onUpdateElement={handleUpdateElement}
          zoom={zoom}
          showGrid={showGrid}
        />
      </div>

      {/* Modals */}
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
          pushState(p);
        }}
        onNewBlankProject={handleNewBlankProject}
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
    </div>
  );
}
