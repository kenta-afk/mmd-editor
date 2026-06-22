import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";
import { ImageDownloadSection } from "./components/ImageDownloadSection";

type Preset = {
  title: string;
  source: string;
  description: string;
};

const presets: Preset[] = [
  {
    title: "Sequence",
    description: "会話ベースの図",
    source: `sequenceDiagram
  participant U as User
  participant E as MMD Editor
  participant R as Renderer

  U->>E: Write Mermaid code
  E->>R: Render preview
  R-->>U: Export PNG`,
  },
  {
    title: "Flowchart",
    description: "手順の分岐",
    source: `flowchart LR
  A[Start] --> B{Valid?}
  B -- Yes --> C[Preview]
  B -- No --> D[Fix input]
  D --> B`,
  },
  {
    title: "Journey",
    description: "体験の流れ",
    source: `journey
  title Diagram workflow
  section Edit
    Type source: 3: User
    See updates: 2: User
  section Export
    Download PNG: 4: User`,
  },
];

const defaultSource = presets[0].source;

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  fontFamily:
    "SF Pro Display, SF Pro Text, Hiragino Sans, HiraKakuProN-W3, system-ui, sans-serif",
  themeVariables: {
    primaryColor: "#dbeafe",
    primaryTextColor: "#0f172a",
    primaryBorderColor: "#2563eb",
    lineColor: "#475569",
    secondaryColor: "#ffedd5",
    tertiaryColor: "#f8fafc",
  },
});

function App() {
  const [source, setSource] = useState(defaultSource);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const renderId = useId().replace(/:/g, "");

  useEffect(() => {
    let alive = true;

    const renderDiagram = async () => {
      setIsRendering(true);

      try {
        const { svg: renderedSvg } = await mermaid.render(
          `mmd-editor-${renderId}`,
          source
        );

        if (!alive) {
          return;
        }

        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        if (!alive) {
          return;
        }

        console.error("Failed to render Mermaid diagram:", err);
        setSvg("");
        setError(
          "プレビューの生成に失敗しました。構文を確認して再試行してください。"
        );
      } finally {
        if (alive) {
          setIsRendering(false);
        }
      }
    };

    void renderDiagram();

    return () => {
      alive = false;
    };
  }, [renderId, source]);

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="hero-panel">
        <div>
          <p className="eyebrow">React + Vite</p>
          <h1>MMD Editor</h1>
          <p className="hero-copy">
            Mermaid図をその場で編集し、プレビューを確認して、PNGとして書き出せる軽量エディタです。
          </p>
        </div>

        <div className="hero-metrics" aria-label="project metrics">
          <div>
            <strong>Live</strong>
            <span>リアルタイム描画</span>
          </div>
          <div>
            <strong>PNG</strong>
            <span>ワンクリック保存</span>
          </div>
          <div>
            <strong>Vite</strong>
            <span>軽快な開発体験</span>
          </div>
        </div>
      </section>

      <section className="workspace-grid">
        <article className="panel editor-panel">
          <div className="panel-header">
            <div>
              <p className="panel-label">Editor</p>
              <h2>Mermaid source</h2>
            </div>
            <span className="status-badge">{source.length} chars</span>
          </div>

          <div className="preset-list" aria-label="preset diagrams">
            {presets.map((preset) => (
              <button
                key={preset.title}
                type="button"
                className={
                  source === preset.source
                    ? "preset-chip active"
                    : "preset-chip"
                }
                onClick={() => setSource(preset.source)}
              >
                <span>{preset.title}</span>
                <small>{preset.description}</small>
              </button>
            ))}
          </div>

          <label className="editor-label" htmlFor="diagram-source">
            Diagram code
          </label>
          <textarea
            id="diagram-source"
            className="editor-input"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            spellCheck={false}
          />

          <p className="helper-text">
            sequenceDiagram や flowchart
            を書き換えて、すぐに結果を確認できます。
          </p>
        </article>

        <article className="panel preview-panel">
          <div className="panel-header">
            <div>
              <p className="panel-label">Preview</p>
              <h2>Rendered output</h2>
            </div>
            <span className="status-badge status-live">
              {isRendering ? "Rendering" : error ? "Error" : "Ready"}
            </span>
          </div>

          <ImageDownloadSection
            fileName="mmd-preview.png"
            buttonText="PNGで保存"
            loadingText="書き出し中..."
            backgroundColor="#f8fafc"
          >
            <div className="preview-stage">
              {error ? (
                <div className="preview-empty error-state">
                  <h3>Preview unavailable</h3>
                  <p>{error}</p>
                </div>
              ) : isRendering ? (
                <div className="preview-empty">
                  <h3>Rendering diagram</h3>
                  <p>ソースの更新に合わせてプレビューを生成しています。</p>
                </div>
              ) : (
                <div
                  className="diagram-svg"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              )}
            </div>
          </ImageDownloadSection>
        </article>
      </section>
    </main>
  );
}

export default App;
