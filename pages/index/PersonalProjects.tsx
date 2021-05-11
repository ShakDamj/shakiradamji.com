import { RemixIcon } from '../../components/RemixIcon';

export function PersonalProjectsSummary() {
  return (
    <section className="projects">
      <h2 lang="en">Personal projects</h2>
      <h2 lang="es">Proyectos personales</h2>
      <h5 lang="en">I build these for fun and to learn</h5>
      <h5 lang="es">Constru&iacute;dos por diversión y para aprender</h5>

      <div className="project mud">
        <h4>
          Web MUD client
          <a href="https://amatiasq.github.io/mud/">
            <RemixIcon name="external-link" title="Live project" />
          </a>
          <a href="https://github.com/amatiasq/mud/">
            <RemixIcon name="github" title="GitHub" fill />
          </a>
        </h4>

        <img />

        <summary>
          <p>
            A terminal emulator running in the browser connected by WebSocket to a
            <a href="https://en.wikipedia.org/wiki/MUD">MUD</a> server via Telnet.
          </p>

          <p>
            The tool has a plugin system to track state like inventory, chat, skills tree... and
            <a href="https://github.com/amatiasq/mud/blob/main/client/src/registerWorkflows.ts#L22-L44">
              "workflows" in order to automate behavior
            </a>
            .
          </p>

          <ul className="tech-stack">
            <li>Typescript</li>
            <li>Preact</li>
            <li>WebSockets</li>
            <li>Regular Expressions</li>
            <li>Webpack</li>
          </ul>
        </summary>
      </div>

      <div className="project lulas">
        <h4>
          Lulas (cell simulation)
          <a href="https://repos.amatiasq.com/lulas/">
            <RemixIcon name="external-link" title="Live project" />
          </a>
          <a href="https://github.com/amatiasq/lulas/">
            <RemixIcon name="github" title="GitHub" fill />
          </a>
          <a href="https://coveralls.io/github/amatiasq/lulas">
            <RemixIcon name="test-tube" title="Test results" fill />
          </a>
        </h4>

        <img />

        <summary>
          <p>
            A simulation of cells hunting each other. There are three kind of cells: Plants (dark green), Gatherer
            (light green) and Hunter (red).
          </p>

          <p>
            Development paused while working on
            <a href="https://amatiasq.github.io/lulas">V2</a> in order to simplify implementation of more complex
            behavior like flocking.
          </p>

          <ul className="tech-stack">
            <li>TDD</li>
            <li>Typescript</li>
            <li>Canvas</li>
            <li>Jest</li>
          </ul>
        </summary>
      </div>

      <div className="project better-gist">
        <h4>
          Better Gist
          <a href="https://gist.amatiasq.com/">
            <RemixIcon name="external-link" title="Live project" />
          </a>
          <a href="https://github.com/amatiasq/np/">
            <RemixIcon name="github" title="GitHub" fill />
          </a>
          <a href="https://youtu.be/GO97zFLc8T0">
            <RemixIcon name="video" title="Introduction video" />
          </a>
        </h4>

        <img />

        <summary>
          <p>
            A tool I needed to edit Github Gists. It has all the power of Visual Studio Code since it's using Monaco
            Editor: Multi-cursor selection, syntax highlighting, intellisense, even Typescript validation.
          </p>

          <p>
            It's installable as an application in Windows, Linux, Mac, Android and iPhone. It manages synchronization
            with GitHub API and there is plan for offline support.
          </p>

          <p>Developed over the February 2021's weekends in hackathon style.</p>

          <ul className="tech-stack">
            <li>Typescript</li>
            <li>React</li>
            <li>Progressive Web Application (PWA)</li>
            <li>Page Visibility API</li>
            <li>OAuth</li>
          </ul>
        </summary>
      </div>

      <div className="project better-gist">
        <h4>
          Genara
          <a href="https://github.com/amatiasq/genara">
            <RemixIcon name="github" title="GitHub" fill />
          </a>
        </h4>

        <div className="media">
          <img src="assets/projects/genara-pelea.png" />
          <img src="assets/projects/genara-time.png" />
          <img src="assets/projects/genara-mensaje.png" />
        </div>

        <summary>
          <p>
            A set of discord bots based on three characters of
            <a href="https://ehtio.es">Eh Tio!</a> comic series. All bots have the same base structure and custom
            behavior is added through a plugin system.
          </p>

          <p>
            All of them could learn sentences, pass messages to other users, ignore users, answer with images... One of
            them implemented a combat system shamelessly copied from
            <a href="https://github.com/amatiasq/genara/blob/master/src/antuan/insultos.json">
              Monkey Island sword fight,
            </a>
            with an increasing difficulty level as you improve while another could
            <a href="https://github.com/amatiasq/genara/blob/43c36c635c3c6dd2f7b4426a3ef435d74bc22cdb/src/genara/middleware/20-hora.js#L16-L25">
              invoke a daemon to tell you the time.
            </a>
          </p>

          <p>Offline due to lack of resources.</p>

          <ul className="tech-stack">
            <li>Javascript</li>
            <li>Discord API</li>
            <li>NodeJS</li>
            <li>MongoDB</li>
            <li>Mongoose</li>
          </ul>
        </summary>
      </div>

      <div className="project ml-detection">
        <h4>
          Computer vision (1. Pose detection
          <a href="https://repos.amatiasq.com/pose-video.html">
            <RemixIcon name="external-link" title="Live project" />
          </a>
          <a href="https://github.com/amatiasq/ml-pose-detection">
            <RemixIcon name="github" title="GitHub" fill />
          </a>
          ) (2. Object detection
          <a href="https://github.com/amatiasq/ml-object-detection">
            <RemixIcon name="github" title="GitHub" fill />
          </a>
          )
        </h4>

        <div className="media">
          <img />
        </div>

        <summary>
          <p>
            A set of discord bots based on three characters of
            <a href="https://ehtio.es">Eh Tio!</a> comic series. All bots have the same base structure and custom
            behavior is added through a plugin system.
          </p>

          <p>
            All of them could learn sentences, pass messages to other users, ignore users, answer with images... One of
            them implemented a combat system shamelessly copied from
            <a href="https://github.com/amatiasq/genara/blob/master/src/antuan/insultos.json">
              Monkey Island sword fight,
            </a>
            with an increasing difficulty level as you improve while another could
            <a href="https://github.com/amatiasq/genara/blob/43c36c635c3c6dd2f7b4426a3ef435d74bc22cdb/src/genara/middleware/20-hora.js#L16-L25">
              invoke a daemon to tell you the time.
            </a>
          </p>

          <p>Offline due to lack of resources.</p>

          <ul className="tech-stack">
            <li>Javascript</li>
            <li>Machine Learning (ml5.js)</li>
            <li>Canvas</li>
            <li>Camera API</li>
            <li>Video processing</li>
          </ul>
        </summary>
      </div>

      {/*
        <!-- https://repos.amatiasq.com/ergodox/ -->
        <!-- https://repos.amatiasq.com/glib/test/ -->
        <!-- https://repos.amatiasq.com/gmtk/ (you can't) -->
        <!-- https://repos.amatiasq.com/speech-test.html -->
        <!-- https://repos.amatiasq.com/requirejs-speech-amatiasq/public/ -->
        <!-- https://amatiasq.github.io/walkie/ -->
        <!-- https://github.com/amatiasq/constitucion-espanola -->
        */}
    </section>
  );
}
