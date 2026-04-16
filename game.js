(() => {
  "use strict";

  const STORAGE_KEY = "domeos-terminal-state-v3";

  const output = document.querySelector("#terminal-output");
  const form = document.querySelector("#terminal-form");
  const input = document.querySelector("#terminal-input");
  const audioToggle = document.querySelector("#audio-toggle");
  const musicBed = document.querySelector("#music-bed");

  const patientRoot = "/patients/alec-b-wreelan";

  const publicFiles = Object.freeze({
    "/readme.txt": {
      title: "START_HERE",
      content: [
        "DomeOS / Overwatch Medical Dome",
        "Patient archival interface restored under emergency power.",
        "",
        "Primary task: review patient files, study each report, and recover corrupted records.",
        "",
        "commands:",
        "  help",
        "  patients",
        "  open <patient-id>",
        "  scan",
        "  ls",
        "  cat <file>",
        "  hack <record>",
        "  connect <node>",
        "  audio on|off",
        "  reset",
        "",
        "start: patients",
      ].join("\n"),
    },
    "/patients/index.txt": {
      title: "PATIENT_INDEX",
      content: [
        "[DomeOS patient index / ward-cold-storage]",
        "",
        "ID                 STATUS       NOTES",
        "P-091 DIMA KOVAC    RELEASED     auditory obedience trial",
        "P-117 MIRA VOSS     DECEASED     antlion venom rejection",
        "P-204 ELIAN ROOK    MISSING      quarantine breach",
        "P-377 ALEC B. WREELAN SEALED     administrative patient / director override",
        "P-401 SANA MERROW   DECEASED     tunnel fever",
        "",
        "Entry P-377 contains an unauthorized directory name. Archive checksum says the letters are correct.",
        "Open with: open alec-b-wreelan",
      ].join("\n"),
    },
    [`${patientRoot}/manifest.txt`]: {
      title: "ALEC_B_WREELAN_MANIFEST",
      content: [
        "[patient P-377 / ALEC B. WREELAN]",
        "",
        "Directory label does not match Combine civil registry format.",
        "Name appears manually rearranged before the last archive seal.",
        "",
        "Encrypted records:",
        "  psych-eval      type: lexical lock",
        "  circulation     type: node bridge",
        "  transfer        type: lexical lock",
        "  relay-grid      type: node bridge",
        "",
        "Begin with: hack psych-eval",
        "Use scan to inspect active locks.",
      ].join("\n"),
    },
    "/patients/dima-kovac/summary.txt": {
      title: "DIMA_KOVAC_SUMMARY",
      content: [
        "[patient P-091 / DIMA KOVAC]",
        "Auditory obedience trial successful. Released into exterior ration queue.",
        "No strategic value.",
      ].join("\n"),
    },
    "/patients/mira-voss/summary.txt": {
      title: "MIRA_VOSS_SUMMARY",
      content: [
        "[patient P-117 / MIRA VOSS]",
        "Rejected antlion-derived anticoagulant. Body rendered unsuitable for transplant inventory.",
      ].join("\n"),
    },
  });

  const reportFiles = Object.freeze({
    "psych-eval": {
      path: `${patientRoot}/report-01-psych-eval.txt`,
      title: "P377_PSYCH_EVAL",
      content: [
        "FILE I - PSYCHOLOGICAL EVALUATION",
        "Subject: alec-b-wreelan",
        "Location: Dome Infirmary, Lower Administrative Ward",
        "Status: Restricted",
        "",
        "The patient presents with marked cognitive decline under prolonged environmental stress and repeated failure of host-body selection protocols. He remains oriented to the Dome and to the broad fact of the collapse beyond it, but there is now a grave narrowing in his reasoning. He returns again and again to the same fixed notion, that somewhere among the broken stock and spoiled vats there waits a viable body prepared for him, some vessel unstained by rot or scarcity or the slow corruption that has entered all systems. He speaks of it as a man might speak of rain in a dead country.",
        "",
        "His sleep is poor. His appetite has failed. There is tremor in both hands and a visible palsy at the corner of the mouth when the pressure in the ward changes. He is subject to long intervals of silence followed by bursts of severe agitation. During these periods he exhibits persecutory ideation and speaks as if the necrotic presence outside the walls possessed not merely numbers but intent, as if it gathered itself against the Dome with an old and patient hatred. He has become increasingly unable to separate operational fact from private dread.",
        "",
        "The circumstances are not favorable to recovery. Time and resources are nearly spent. The last reserve effort has been committed to maintenance of the Dome. Peripheral cities continue to fail. Supply relays have ceased in three sectors. Cremation trenches are overrun or abandoned. The dead are not holding where they are put. In such a world even the sound mind comes to grief, and this one has begun to slip its moorings.",
        "",
        "The patient retains fragments of command presence though it appears more mimicry than substance. He will speak with force and then lose the line of thought midway as if some inner clerk has misplaced the record. He shows incapacity to accept the biological limits of his current condition and compensates with grandiose insistence. Yet beneath this is fear plain enough to any examiner. He knows the body is failing him. He knows that if no host is found there will be no second petition.",
        "",
        "Impression: progressive mental deterioration under terminal civilizational stress. Obsession with bodily transfer now exceeds strategic rationality. Capacity for long-term judgment compromised. Recommend sedation as needed, close supervision, and accelerated review of all viable host inventories before further decompensation renders the subject unusable for transfer.",
      ].join("\n"),
    },
    circulation: {
      path: `${patientRoot}/report-02-circulation.txt`,
      title: "P377_CIRCULATION",
      content: [
        "FILE II - CIRCULATION MEMORANDUM",
        "Subject: alec-b-wreelan",
        "Department: Cardiocerebral Circulation and Transplant Readiness",
        "Status: Eyes Only",
        "",
        "Review of the patient indicates worsening systemic failure. Circulatory efficiency has fallen below acceptable thresholds for continued delay. Blood oxygenation remains unstable even under assisted regulation. Vessel fragility is noted. Neural imaging suggests diffuse decline in cortical responsiveness consistent with advancing metabolic exhaustion. The brain is failing by slow increments and the rest of the body has taken the lesson from it. He is beginning to die.",
        "",
        "A candidate host body has been identified from preserved reserve stock. Morphology is within tolerable variance. Bone density acceptable. Organ integrity mostly intact. Endocrine base appears salvageable with supplementation. There are concerns regarding tissue receptivity due to age of preservation and fluctuations in cold-storage power during the last two blackout cycles. Even so it stands above the other candidates, many of which are compromised by necrotic contamination, freezer breach, or protein collapse.",
        "",
        "The patient is aware of his decline. This awareness has sharpened into visible panic. He requests repeated updates and presses staff for certainty where none can be given. He asks whether the mind can outrun the meat and whether memory may be carried whole into fresher tissue. He has taken to touching the sides of his head while speaking, as if to keep the failing architecture together by hand.",
        "",
        "Current recommendation is immediate transplant preparation pending final compatibility wash and pump trial. Delay beyond the present window increases the chance of irreversible neural loss before extraction can be completed. The matter is now less one of optimization than of salvage. If transfer is to be done, it must be done while there remains enough of him to move.",
        "",
        "Note appended: morale among technical staff is poor. Two senior pump operators failed to report after the breach alarms in the north quarter. One was later found in the intake corridor. The other has not been recovered. The city ledger keeps shrinking. The dead ledger grows.",
      ].join("\n"),
    },
    transfer: {
      path: `${patientRoot}/report-03-transfer.txt`,
      title: "P377_TRANSFER",
      content: [
        "FILE III - TRANSFER OPERATIONS NOTE",
        "Subject: alec-b-wreelan",
        "Procedure: Cerebral Transfer Into Approved Host Body",
        "Status: Preliminary Complications Advisory",
        "",
        "Transfer may proceed under emergency authorization. The host body is prepped and maintained under circulation assist. All lines are seated though Pump B shows intermittent lag under elevated load. Technicians report microcavitation in the secondary return chamber and pressure irregularities in the left perfusion branch. If not corrected before insertion, these defects may lead to ischemic insult during the critical window of memory mapping and neural settlement.",
        "",
        "Metabolic steroid support remains necessary but dosage is contested. Under current projections the host body will reject low steroid infusion and may enter inflammatory cascade within hours. High infusion improves tissue acceptance while increasing the risk of edema, endocrine shock, and cognitive destabilization after the memory transfer. No clean road remains. We are choosing among poor roads in failing light.",
        "",
        "Brain-memory transfer itself is expected to be incomplete. Archive retention may hold the primary identity scaffold, language, command recall, and procedural memory. Episodic continuity is less certain. There may be fragmentation. There may be false bridging between memory islands. There may be retention of fear without object, command without reason, grievance without sequence. Subject should be monitored for post-transfer confusion, paranoia, derealization, and violent rejection of staff or self.",
        "",
        "In light of continuing urban losses, operations recommends opening the citizen workforce reserves to emergency labor assignment. Dome maintenance now exceeds trained staffing capacity. Intake grates must be cleared daily. Heat exchangers require round-the-clock scraping. Sanitation ducts backflow on reduced pressure. As more cities fall and necrotic numbers rise, dependence on the dwindling specialist class is no longer feasible. The citizen reserves should be sorted, fed, marked, and put to work where the machinery still answers to human hands.",
        "",
        "Final note: success of transfer, even if achieved, will not alter the strategic collapse outside the perimeter. It may preserve a figurehead. It may preserve a voice. It will not by itself preserve the world.",
      ].join("\n"),
    },
    "relay-grid": {
      path: `${patientRoot}/report-04-relay-grid.txt`,
      title: "P377_RELAY_GRID",
      content: [
        "FILE IV - TERMINAL OBSERVATION / MENTAL STATUS",
        "Subject: alec-b-wreelan",
        "Location: Dome Perimeter Medical Annex",
        "Status: Final Review",
        "",
        "The patient is in severe decline of mind and person. He appears spiritually spent, not in any ecclesiastical sense but in the plain human one, as if whatever inward flame once gave order to his thought has guttered down to a blue and stubborn wick. He is a torn and abused man standing on the frail rim of his own extinction. The host body rejects in waves. Some hours it will answer to him and some hours it becomes a foreign carcass hung with his nerves. He speaks to his own hands as if they belonged to an enemy clerk.",
        "",
        "Thought is no longer coherent in sustained sequence. He begins one sentence in command and ends it in pleading. He misidentifies staff. He forgets where walls are and walks into them. He suspects sabotage in the pumps, betrayal in the ward, conspiracy in the weather. He has become irrational, at times grandiose and at times childlike, and there is no longer any stable line between the two states. He cannot gather himself. He cannot hold the pieces together long enough to make a clean intention of them.",
        "",
        "The external situation has worsened beyond prior estimates. Necrotics now surround the perimeter walls in numbers sufficient to produce constant impact along the east buttresses and lower gate. Oxygen reserves decline month by month. Atmospheric scrubbers operate below design capacity and the air in the Dome has taken on the used and sour character of a cellar where too many bodies have drawn breath too long. Rations have been reduced again. The stores issue slop and potatoes and little else. Hygiene has collapsed in several worker tiers. Wash water is rationed. Skin disease spreads. Waste channels choke. Civil unrest rises in the dark hours and the guards beat men in line for ladles of mash.",
        "",
        "Beyond the glass the whole enclosed world has taken on the aspect of a snowglobe shaken by a spiteful hand. Blizzard conditions persist over the upper shell. Ice veils the struts. Visibility comes and goes in white curtains. The Dome is succumbing not to one enemy but to all of them at once, to hunger and cold and foul air and fear and the old human habit of coming apart under pressure.",
        "",
        "The patient senses this. Whatever else leaves him, that remains. He knows the circle is closing. He knows that the body borrowed for his continuance has become another site of ruin. He sits upright at times in the infirmary cot and stares toward the perimeter as if he could see through concrete and snow and steel to the dark congregation outside. When addressed, he answers late if at all. When he does speak his words come like debris borne on black water, detached and half sunk.",
        "",
        "Prognosis: terminal deterioration of cognitive integrity in the setting of host rejection, systemic deprivation, and total environmental collapse. No meaningful recovery expected. Continued existence may persist for a short interval under mechanical support, but the patient as a coherent governing intelligence is nearly gone. What remains is fear, reflex, and the last hard flicker of a mind that has outlived its world.",
      ].join("\n"),
    },
  });

  const hackPuzzles = Object.freeze({
    "psych-eval": {
      title: "PSYCH_EVAL_LEXICAL_LOCK",
      target: "memory",
      attempts: 4,
      candidates: ["MEMORY", "MIRROR", "MANNER", "MOTHER", "MURMUR", "MEDICS", "MENACE", "MEADOW"],
      unlocks: "psych-eval",
      nextMessage: "psych-eval decrypted. New report restored.",
    },
    transfer: {
      title: "TRANSFER_LEXICAL_LOCK",
      target: "vessel",
      attempts: 4,
      candidates: ["VESSEL", "VECTOR", "VELVET", "VERBAL", "VISCUS", "VORTEX", "VIABLE", "VOICES"],
      unlocks: "transfer",
      nextMessage: "transfer decrypted. New report restored.",
    },
  });

  const nodePuzzles = Object.freeze({
    circulation: {
      title: "CIRCULATION_NODE_BRIDGE",
      path: ["A3", "B3", "C3", "C2", "C1", "D1"],
      nodes: ["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2", "A3", "B3", "C3", "D3"],
      edges: [
        ["A1", "B1"],
        ["B1", "C1"],
        ["C1", "D1"],
        ["A2", "B2"],
        ["B2", "C2"],
        ["C2", "D2"],
        ["A3", "B3"],
        ["B3", "C3"],
        ["C3", "D3"],
        ["A1", "A2"],
        ["A2", "A3"],
        ["C1", "C2"],
        ["C2", "C3"],
      ],
      unlocks: "circulation",
      diagram: [
        "A1 -- B1 -- C1 -- D1",
        "|          |          ",
        "A2 -- B2 -- C2 -- D2",
        "|          |          ",
        "A3 -- B3 -- C3 -- D3",
        "",
        "Start: A3",
        "End:   D1",
        "Pressure residue marks: A3 B3 C3 C2 C1 D1",
      ].join("\n"),
      nextMessage: "circulation bridge accepted. New report restored.",
    },
    "relay-grid": {
      title: "RELAY_GRID_NODE_BRIDGE",
      path: ["P2", "Q2", "Q3"],
      nodes: [
        "P1",
        "Q1",
        "R1",
        "S1",
        "P2",
        "Q2",
        "R2",
        "S2",
        "P3",
        "Q3",
        "R3",
        "S3",
        "P4",
        "Q4",
        "R4",
        "S4",
      ],
      edges: [
        ["P1", "Q1"],
        ["Q1", "R1"],
        ["R1", "S1"],
        ["P2", "Q2"],
        ["Q2", "R2"],
        ["R2", "S2"],
        ["P3", "Q3"],
        ["Q3", "R3"],
        ["R3", "S3"],
        ["P4", "Q4"],
        ["Q4", "R4"],
        ["R4", "S4"],
        ["P1", "P2"],
        ["P2", "P3"],
        ["P3", "P4"],
        ["Q1", "Q2"],
        ["Q2", "Q3"],
        ["Q3", "Q4"],
        ["R1", "R2"],
        ["R2", "R3"],
        ["R3", "R4"],
      ],
      unlocks: "relay-grid",
      diagram: [
        "P1 -- Q1 -- R1 -- S1",
        "|          |          ",
        "P2 -- Q2 -- R2 -- S2",
        "|          |          ",
        "P3 -- Q3 -- R3 -- S3",
        "|          |          ",
        "P4 -- Q4 -- R4 -- S4",
        "",
        "Start: P2",
        "End:   Q3",
        "Relay burn order damaged. Bridge any live conduit path from P2 to Q3.",
      ].join("\n"),
      nextMessage: "relay-grid bridge accepted. Final report restored.",
    },
  });

  const bootLines = [
    "DomeOS v0.4 [PATIENT ARCHIVE]",
    "patient index: damaged",
    "director records: sealed",
    "fluorescent ballast: failing",
    "Combine medical dome uplink: partial",
    "",
    "type help",
    "type patients",
  ];

  let history = [];
  let historyIndex = 0;
  let audioContext = null;
  let buzzNodes = null;
  let audioWanted = true;
  let state = loadState();

  function defaultState() {
    return {
      unlockedReports: [],
      hackAttempts: {},
      files: {},
      victory: false,
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return defaultState();
      }

      const parsed = JSON.parse(raw);
      return {
        unlockedReports: Array.isArray(parsed.unlockedReports) ? parsed.unlockedReports : [],
        hackAttempts: parsed.hackAttempts && typeof parsed.hackAttempts === "object" ? parsed.hackAttempts : {},
        files: parsed.files && typeof parsed.files === "object" ? parsed.files : {},
        victory: Boolean(parsed.victory),
      };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function resetState() {
    state = defaultState();
    saveState();
  }

  function normalizeValue(value) {
    return String(value)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeNodePath(value) {
    return String(value)
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function allFiles() {
    return {
      ...publicFiles,
      ...state.files,
    };
  }

  function print(text = "", className = "") {
    for (const lineText of String(text).split("\n")) {
      const line = document.createElement("div");
      line.className = className ? `line ${className}` : "line";
      line.textContent = lineText;
      output.appendChild(line);
    }
    output.scrollTop = output.scrollHeight;
  }

  function printBlock(lines, className = "") {
    print(lines.join("\n"), className);
  }

  function appendPanel(panel) {
    output.appendChild(panel);
    output.scrollTop = output.scrollHeight;
  }

  function makePanel(title) {
    const panel = document.createElement("div");
    panel.className = "terminal-panel";

    const heading = document.createElement("div");
    heading.className = "terminal-panel-title";
    heading.textContent = title;
    panel.appendChild(heading);

    return panel;
  }

  function makePanelLine(text, className = "") {
    const line = document.createElement("div");
    line.className = className ? `panel-line ${className}` : "panel-line";
    line.textContent = text;
    return line;
  }

  function makePanelButton(text, onClick) {
    const button = document.createElement("button");
    button.className = "terminal-button";
    button.type = "button";
    button.textContent = text;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      audioAutoplayAttempt();
      onClick(button);
    });
    return button;
  }

  function jolt() {
    document.body.classList.add("screen-jolt");
    window.setTimeout(() => document.body.classList.remove("screen-jolt"), 210);
  }

  function setAudioStatus(text, armed) {
    audioToggle.textContent = text;
    audioToggle.classList.toggle("armed", armed);
  }

  async function startAudio() {
    audioWanted = true;
    if (musicBed) {
      musicBed.volume = 0.34;
      musicBed.loop = true;
      musicBed.autoplay = true;
      try {
        const result = musicBed.play();
        if (result && typeof result.catch === "function") {
          result.catch(() => setAudioStatus("sound: blocked", false));
        }
      } catch {
        setAudioStatus("sound: blocked", false);
      }
    }

    startFluorescentBuzz();
    setAudioStatus("sound: on", true);
  }

  function stopAudio() {
    audioWanted = false;
    if (musicBed) {
      musicBed.pause();
    }
    if (buzzNodes) {
      buzzNodes.master.gain.setTargetAtTime(0, audioContext.currentTime, 0.04);
    }
    setAudioStatus("sound: off", false);
  }

  function startFluorescentBuzz() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      return;
    }

    if (!audioContext) {
      audioContext = new AudioCtor();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (buzzNodes) {
      buzzNodes.master.gain.setTargetAtTime(0.018, audioContext.currentTime, 0.06);
      return;
    }

    const master = audioContext.createGain();
    master.gain.value = 0.018;
    master.connect(audioContext.destination);

    const hum = audioContext.createOscillator();
    hum.type = "sawtooth";
    hum.frequency.value = 50;
    const humGain = audioContext.createGain();
    humGain.gain.value = 0.28;

    const buzz = audioContext.createOscillator();
    buzz.type = "square";
    buzz.frequency.value = 100;
    const buzzGain = audioContext.createGain();
    buzzGain.gain.value = 0.045;

    const bufferSize = audioContext.sampleRate * 2;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < bufferSize; index += 1) {
      data[index] = (Math.random() * 2 - 1) * 0.55;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 3600;
    bandpass.Q.value = 8;

    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.018;

    hum.connect(humGain).connect(master);
    buzz.connect(buzzGain).connect(master);
    noise.connect(bandpass).connect(noiseGain).connect(master);

    hum.start();
    buzz.start();
    noise.start();

    buzzNodes = { master, hum, buzz, noise };
  }

  function audioAutoplayAttempt() {
    if (!audioWanted) {
      return;
    }
    startAudio();
  }

  function hasReport(id) {
    return state.unlockedReports.includes(id);
  }

  function unlockReport(id, message) {
    const report = reportFiles[id];
    if (!report) {
      return;
    }

    if (!hasReport(id)) {
      state.unlockedReports.push(id);
    }

    state.files[report.path] = {
      title: report.title,
      content: report.content,
    };

    if (id === "relay-grid") {
      state.victory = true;
    }

    saveState();
    print(message || `${id} decrypted`, "success");
    print(`restored: ${report.path}`, "success");
  }

  function formatFileList() {
    const files = allFiles();
    return Object.keys(files)
      .sort((a, b) => a.localeCompare(b))
      .map((path) => `${path.padEnd(42, " ")} ${files[path].title || ""}`);
  }

  function lockedRecords() {
    const records = [];
    if (!hasReport("psych-eval")) {
      records.push("psych-eval      LOCKED   lexical   hack psych-eval");
    }
    if (hasReport("psych-eval") && !hasReport("circulation")) {
      records.push("circulation     LOCKED   node      connect circulation");
    }
    if (hasReport("circulation") && !hasReport("transfer")) {
      records.push("transfer        LOCKED   lexical   hack transfer");
    }
    if (hasReport("transfer") && !hasReport("relay-grid")) {
      records.push("relay-grid      LOCKED   node      connect relay-grid");
    }
    return records;
  }

  function showHelp() {
    printBlock([
      "commands",
      "  help                         list commands",
      "  patients                     list patient index",
      "  open <patient-id>            open patient directory",
      "  scan                         list files and active encrypted records",
      "  ls                           list readable files",
      "  cat <file>                   read file",
      "  hack <record>                open interactive likeness lock",
      "  connect <node>               open interactive node bridge",
      "  audio on|off                 toggle music and fluorescent buzz",
      "  clear                        wipe visible terminal",
      "  reset                        erase local progress",
    ]);
  }

  function showPatients() {
    showFile("/patients/index.txt");
  }

  function openPatient(patientId) {
    const normalized = normalizeValue(patientId).replace(/\s+/g, "-");
    if (normalized === "alec-b-wreelan" || normalized === "p-377" || normalized === "p-377-alec-b-wreelan") {
      print("opening patient P-377 / ALEC B. WREELAN", "system");
      showFile(`${patientRoot}/manifest.txt`);
      return;
    }

    if (normalized === "dima-kovac" || normalized === "p-091") {
      showFile("/patients/dima-kovac/summary.txt");
      return;
    }

    if (normalized === "mira-voss" || normalized === "p-117") {
      showFile("/patients/mira-voss/summary.txt");
      return;
    }

    print("patient not found or directory purged", "error");
    jolt();
  }

  function showScan() {
    print("READABLE FILES", "system");
    printBlock(formatFileList());
    print("");
    print("P-377 ENCRYPTED RECORDS", "system");
    const locked = lockedRecords();
    if (locked.length) {
      printBlock(locked);
    } else {
      print("none; patient sequence exhausted", "success");
    }
    print("");
    print("ACTIVE NODE MAPS", "system");
    if (hasReport("psych-eval") && !hasReport("circulation")) {
      print(nodePuzzles.circulation.diagram);
    } else if (hasReport("transfer") && !hasReport("relay-grid")) {
      print(nodePuzzles["relay-grid"].diagram);
    } else {
      print("none");
    }
  }

  function showFile(path) {
    const files = allFiles();
    const file = files[path];
    if (!file) {
      print(`file not found: ${path}`, "error");
      jolt();
      return;
    }
    print(file.content);
  }

  function likeness(candidate, target) {
    const a = candidate.toUpperCase();
    const b = target.toUpperCase();
    let score = 0;
    for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
      if (a[index] === b[index]) {
        score += 1;
      }
    }
    return score;
  }

  function canHack(recordId) {
    if (recordId === "psych-eval") {
      return true;
    }
    if (recordId === "transfer") {
      return hasReport("circulation");
    }
    return false;
  }

  function renderHackPanel(recordId) {
    const puzzle = hackPuzzles[recordId];
    if (!puzzle) {
      print("lexical lock not found", "error");
      jolt();
      return;
    }

    if (!canHack(recordId)) {
      print("record dependency missing", "error");
      jolt();
      return;
    }

    if (hasReport(puzzle.unlocks)) {
      print("record already decrypted", "system");
      return;
    }

    const panel = makePanel(puzzle.title);
    panel.classList.add("fallout-panel");

    const header = document.createElement("div");
    header.className = "fallout-header";
    header.textContent = "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL";

    const attempts = document.createElement("div");
    attempts.className = "fallout-attempts";

    const status = document.createElement("div");
    status.className = "fallout-status";
    status.textContent = "ENTER PASSWORD NOW";

    const dump = document.createElement("div");
    dump.className = "fallout-memory";

    const log = document.createElement("div");
    log.className = "fallout-log";
    log.appendChild(makePanelLine(">"));
    log.appendChild(makePanelLine("> Password Required"));

    function refreshAttempts() {
      const remaining = remainingAttempts(recordId, puzzle);
      attempts.textContent = `Attempts Remaining: ${"■ ".repeat(remaining).trim()}`;
    }

    function disableAll() {
      for (const child of dump.querySelectorAll("button")) {
        child.disabled = true;
      }
    }

    function appendLog(text, className = "") {
      const line = makePanelLine(`> ${text}`, className);
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }

    function removeDud() {
      const wrongWords = Array.from(dump.querySelectorAll(".memory-token.word:not(:disabled)")).filter(
        (button) => button.dataset.word !== puzzle.target.toUpperCase(),
      );
      const dud = wrongWords[Math.floor(Math.random() * wrongWords.length)];
      if (!dud) {
        appendLog("No dud words remaining");
        return;
      }
      dud.disabled = true;
      dud.textContent = ".".repeat(dud.dataset.word.length);
      appendLog("Dud removed");
    }

    function replenishAllowance() {
      state.hackAttempts[recordId] = Math.max(0, (state.hackAttempts[recordId] || 0) - 1);
      saveState();
      refreshAttempts();
      appendLog("Allowance replenished");
    }

    for (const rowData of buildMemoryDump(puzzle)) {
      const row = document.createElement("div");
      row.className = "memory-row";

      for (const cell of rowData) {
        const address = document.createElement("span");
        address.className = "memory-address";
        address.textContent = cell.address;

        const chars = document.createElement("span");
        chars.className = "memory-chars";

        for (const part of cell.parts) {
          if (part.type === "word") {
            const button = document.createElement("button");
            button.className = "memory-token word";
            button.type = "button";
            button.textContent = part.text;
            button.dataset.word = part.text;
            button.addEventListener("click", (event) => {
              event.stopPropagation();
              audioAutoplayAttempt();
              if (button.disabled || hasReport(puzzle.unlocks)) {
                return;
              }
              appendLog(`${part.text}`);
              const solved = resolveHackGuess(recordId, part.text);
              if (solved) {
                status.textContent = "ACCESS GRANTED";
                appendLog("Exact match!", "success");
                disableAll();
                return;
              }
              const match = likeness(part.text, puzzle.target);
              appendLog(`Entry denied`);
              appendLog(`Likeness=${match}/${puzzle.target.length}`);
              button.disabled = true;
              refreshAttempts();
              if (!remainingAttempts(recordId, puzzle)) {
                status.textContent = "TERMINAL RESET";
                appendLog("Terminal lock reset");
                refreshAttempts();
              }
            });
            chars.appendChild(button);
          } else if (part.type === "bracket") {
            const button = document.createElement("button");
            button.className = "memory-token bracket";
            button.type = "button";
            button.textContent = part.text;
            button.addEventListener("click", (event) => {
              event.stopPropagation();
              audioAutoplayAttempt();
              if (button.disabled) {
                return;
              }
              button.disabled = true;
              if (part.effect === "replenish") {
                replenishAllowance();
              } else {
                removeDud();
              }
            });
            chars.appendChild(button);
          } else {
            chars.appendChild(document.createTextNode(part.text));
          }
        }

        row.appendChild(address);
        row.appendChild(chars);
      }

      dump.appendChild(row);
    }

    refreshAttempts();
    panel.appendChild(header);
    panel.appendChild(attempts);
    panel.appendChild(status);
    panel.appendChild(dump);
    panel.appendChild(log);
    appendPanel(panel);
  }

  function buildMemoryDump(puzzle) {
    const words = deterministicShuffle([...puzzle.candidates], puzzle.target);
    const bracketChunks = [
      { text: "<{}>", effect: "remove" },
      { text: "[!!]", effect: "remove" },
      { text: "(..)", effect: "remove" },
      { text: "{<>}", effect: "replenish" },
    ];
    const filler = "!@#$%^&*()-_=+[]{};:,.<>/?\\|";
    const inserts = [
      ...words.map((word) => ({ type: "word", text: word })),
      ...bracketChunks.map((chunk) => ({ type: "bracket", text: chunk.text, effect: chunk.effect })),
    ];
    const slots = spreadSlots(inserts.length, 48, puzzle.target);
    const cells = [];

    for (let index = 0; index < 48; index += 1) {
      const parts = [];
      const slotIndex = slots.indexOf(index);
      const insert = slotIndex >= 0 ? inserts[slotIndex] : null;
      if (insert) {
        const beforeLength = 1 + ((index * 5) % Math.max(2, 11 - insert.text.length));
        const afterLength = Math.max(0, 12 - beforeLength - insert.text.length);
        parts.push({ type: "text", text: randomFiller(filler, beforeLength, index) });
        parts.push(insert);
        parts.push({ type: "text", text: randomFiller(filler, afterLength, index + 13) });
      } else {
        parts.push({ type: "text", text: randomFiller(filler, 12, index + 23) });
      }
      cells.push({
        address: `0x${(0xf420 + index * 12).toString(16).toUpperCase()}`,
        parts,
      });
    }

    const rows = [];
    for (let index = 0; index < cells.length; index += 2) {
      rows.push([cells[index], cells[index + 1]]);
    }
    return rows;
  }

  function deterministicShuffle(items, seedText) {
    const result = [...items];
    let seed = 0;
    for (const char of seedText) {
      seed += char.charCodeAt(0);
    }

    for (let index = result.length - 1; index > 0; index -= 1) {
      seed = (seed * 9301 + 49297) % 233280;
      const swapIndex = seed % (index + 1);
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }

    if (typeof result[0] === "string" && result[0].toUpperCase() === seedText.toUpperCase()) {
      [result[0], result[Math.min(3, result.length - 1)]] = [result[Math.min(3, result.length - 1)], result[0]];
    }

    return result;
  }

  function spreadSlots(count, total, seedText) {
    const slots = [];
    let seed = seedText.length * 17;
    const spacing = total / count;

    for (let index = 0; index < count; index += 1) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const jitterRange = Math.max(1, Math.floor(spacing / 2));
      const jitter = (seed % (jitterRange * 2 + 1)) - jitterRange;
      const slot = Math.max(1, Math.min(total - 2, Math.floor(index * spacing + spacing / 2 + jitter)));
      let finalSlot = slot;
      while (slots.includes(finalSlot)) {
        finalSlot = (finalSlot + 1) % total;
      }
      slots.push(finalSlot);
    }

    return deterministicShuffle(slots, `${seedText}-slots`);
  }

  function randomFiller(characters, length, seed) {
    let text = "";
    for (let index = 0; index < length; index += 1) {
      text += characters[(seed * 7 + index * 11) % characters.length];
    }
    return text;
  }

  function resolveHackGuess(recordId, word) {
    const puzzle = hackPuzzles[recordId];
    const guess = word.toUpperCase();

    if (!puzzle.candidates.includes(guess)) {
      print("word not present in lock memory", "error");
      jolt();
      return false;
    }

    if (guess === puzzle.target.toUpperCase()) {
      delete state.hackAttempts[recordId];
      unlockReport(puzzle.unlocks, puzzle.nextMessage);
      return true;
    }

    const attempts = (state.hackAttempts[recordId] || 0) + 1;
    state.hackAttempts[recordId] = attempts;
    saveState();

    const remaining = Math.max(0, puzzle.attempts - attempts);
    print(`entry denied: ${guess} likeness ${likeness(guess, puzzle.target)}/${puzzle.target.length}`, "warn");
    print(`attempts remaining: ${remaining}`, remaining ? "warn" : "error");
    jolt();

    if (!remaining) {
      state.hackAttempts[recordId] = 0;
      saveState();
      print("lock memory cycled; attempts reset", "system");
    }

    return false;
  }

  function hack(recordId, word) {
    const puzzle = hackPuzzles[recordId];
    if (!puzzle) {
      print("lexical lock not found", "error");
      jolt();
      return;
    }

    if (!canHack(recordId)) {
      print("record dependency missing", "error");
      jolt();
      return;
    }

    if (hasReport(puzzle.unlocks)) {
      print("record already decrypted", "system");
      return;
    }

    if (!word) {
      renderHackPanel(recordId);
      return;
    }

    resolveHackGuess(recordId, word);
  }

  function remainingAttempts(recordId, puzzle) {
    return Math.max(0, puzzle.attempts - (state.hackAttempts[recordId] || 0));
  }

  function canConnect(nodeId) {
    if (nodeId === "circulation") {
      return hasReport("psych-eval");
    }
    if (nodeId === "relay-grid") {
      return hasReport("transfer");
    }
    return false;
  }

  function nodePosition(nodeName, puzzle) {
    const columns = Array.from(new Set(puzzle.nodes.map((node) => node[0]))).sort();
    const rows = Array.from(new Set(puzzle.nodes.map((node) => Number(node.slice(1))))).sort((a, b) => a - b);
    const columnIndex = columns.indexOf(nodeName[0]);
    const rowIndex = rows.indexOf(Number(nodeName.slice(1)));
    const width = 420;
    const height = rows.length > 3 ? 310 : 250;
    const xPad = 52;
    const yPad = 48;
    const x = xPad + columnIndex * ((width - xPad * 2) / Math.max(1, columns.length - 1));
    const y = yPad + rowIndex * ((height - yPad * 2) / Math.max(1, rows.length - 1));
    return { x, y, width, height };
  }

  function edgeKey(a, b) {
    return [a, b].sort().join("::");
  }

  function areNodesConnected(puzzle, a, b) {
    const key = edgeKey(a, b);
    return puzzle.edges.some(([left, right]) => edgeKey(left, right) === key);
  }

  function renderNodePanel(nodeId) {
    const puzzle = nodePuzzles[nodeId];
    if (!puzzle) {
      print("node bridge not found", "error");
      jolt();
      return;
    }

    if (!canConnect(nodeId)) {
      print("node dependency missing", "error");
      jolt();
      return;
    }

    if (hasReport(puzzle.unlocks)) {
      print("node bridge already accepted", "system");
      return;
    }

    const selected = [];
    const panel = makePanel(puzzle.title);
    const status = makePanelLine("PATH: [empty]");
    const startNode = puzzle.path[0];
    const endNode = puzzle.path[puzzle.path.length - 1];

    panel.appendChild(status);

    const map = document.createElement("div");
    map.className = "node-map";

    const svgNs = "http://www.w3.org/2000/svg";
    const firstPos = nodePosition(puzzle.nodes[0], puzzle);
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("viewBox", `0 0 ${firstPos.width} ${firstPos.height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${puzzle.title} node map`);

    const conduitLayer = document.createElementNS(svgNs, "g");
    conduitLayer.setAttribute("class", "node-conduits");
    const activeLayer = document.createElementNS(svgNs, "g");
    activeLayer.setAttribute("class", "node-active-lines");
    const nodeLayer = document.createElementNS(svgNs, "g");
    nodeLayer.setAttribute("class", "node-points");

    function drawLine(layer, from, to, className) {
      const fromPos = nodePosition(from, puzzle);
      const toPos = nodePosition(to, puzzle);
      const line = document.createElementNS(svgNs, "line");
      line.setAttribute("x1", fromPos.x);
      line.setAttribute("y1", fromPos.y);
      line.setAttribute("x2", toPos.x);
      line.setAttribute("y2", toPos.y);
      line.setAttribute("class", className);
      layer.appendChild(line);
    }

    function redrawActivePath() {
      activeLayer.textContent = "";
      for (let index = 1; index < selected.length; index += 1) {
        drawLine(activeLayer, selected[index - 1], selected[index], "active-conduit");
      }
      status.textContent = `PATH: ${selected.join(" ") || "[empty]"}`;
      for (const point of nodeLayer.querySelectorAll(".node-point")) {
        const nodeName = point.getAttribute("data-node");
        point.classList.toggle("selected", selected.includes(nodeName));
        point.classList.toggle("current", selected[selected.length - 1] === nodeName);
      }
    }

    function lockPanel() {
      for (const point of nodeLayer.querySelectorAll(".node-point")) {
        point.classList.add("locked");
      }
      for (const button of panel.querySelectorAll("button")) {
        button.disabled = true;
      }
    }

    function chooseNode(nodeName) {
      if (!selected.length && nodeName !== startNode) {
        print(`bridge must start at ${startNode}`, "warn");
        jolt();
        return;
      }

      const previous = selected[selected.length - 1];
      if (previous && !areNodesConnected(puzzle, previous, nodeName)) {
        print(`no conduit between ${previous} and ${nodeName}`, "error");
        jolt();
        return;
      }

      if (previous === nodeName) {
        return;
      }

      selected.push(nodeName);
      redrawActivePath();

      if (nodeName === endNode) {
        const solved = resolveNodePath(nodeId, selected);
        if (solved) {
          panel.appendChild(makePanelLine("BRIDGE ACCEPTED", "success"));
          lockPanel();
        }
      }
    }

    for (const [from, to] of puzzle.edges) {
      drawLine(conduitLayer, from, to, "base-conduit");
    }

    for (const nodeName of puzzle.nodes) {
      const { x, y } = nodePosition(nodeName, puzzle);
      const group = document.createElementNS(svgNs, "g");
      group.setAttribute("class", "node-point");
      group.setAttribute("data-node", nodeName);
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", `node ${nodeName}`);

      const ring = document.createElementNS(svgNs, "circle");
      ring.setAttribute("cx", x);
      ring.setAttribute("cy", y);
      ring.setAttribute("r", 18);

      const label = document.createElementNS(svgNs, "text");
      label.setAttribute("x", x);
      label.setAttribute("y", y + 5);
      label.textContent = nodeName;

      group.appendChild(ring);
      group.appendChild(label);
      group.addEventListener("click", (event) => {
        event.stopPropagation();
        audioAutoplayAttempt();
        if (!group.classList.contains("locked")) {
          chooseNode(nodeName);
        }
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          chooseNode(nodeName);
        }
      });
      nodeLayer.appendChild(group);
    }

    svg.appendChild(conduitLayer);
    svg.appendChild(activeLayer);
    svg.appendChild(nodeLayer);
    map.appendChild(svg);

    panel.appendChild(makePanelLine(`Connect ${startNode} to ${endNode}. Click adjacent nodes to draw the bridge.`));
    panel.appendChild(map);

    const controls = document.createElement("div");
    controls.className = "panel-controls";
    controls.appendChild(
      makePanelButton("SUBMIT PATH", () => {
        const solved = resolveNodePath(nodeId, selected);
        if (solved) {
          panel.appendChild(makePanelLine("BRIDGE ACCEPTED", "success"));
          lockPanel();
        }
      }),
    );
    controls.appendChild(
      makePanelButton("BACKSPACE", () => {
        selected.pop();
        redrawActivePath();
      }),
    );
    controls.appendChild(
      makePanelButton("CLEAR", () => {
        selected.length = 0;
        redrawActivePath();
      }),
    );

    panel.appendChild(controls);
    appendPanel(panel);
  }

  function resolveNodePath(nodeId, path) {
    const puzzle = nodePuzzles[nodeId];
    const start = puzzle.path[0];
    const end = puzzle.path[puzzle.path.length - 1];
    const ok =
      path.length >= 2 &&
      path[0] === start &&
      path[path.length - 1] === end &&
      path.every((node) => puzzle.nodes.includes(node)) &&
      path.every((node, index) => index === 0 || areNodesConnected(puzzle, path[index - 1], node));

    if (!ok) {
      print("bridge rejected; signal returns wrong", "error");
      print(`received: ${path.join(" ") || "empty"}`, "warn");
      jolt();
      return false;
    }

    unlockReport(puzzle.unlocks, puzzle.nextMessage);
    return true;
  }

  function connectNode(nodeId, rawPath) {
    const puzzle = nodePuzzles[nodeId];
    if (!puzzle) {
      print("node bridge not found", "error");
      jolt();
      return;
    }

    if (!canConnect(nodeId)) {
      print("node dependency missing", "error");
      jolt();
      return;
    }

    if (hasReport(puzzle.unlocks)) {
      print("node bridge already accepted", "system");
      return;
    }

    if (!rawPath) {
      renderNodePanel(nodeId);
      return;
    }

    const path = normalizeNodePath(rawPath);
    resolveNodePath(nodeId, path);
  }

  async function handleCommand(rawValue) {
    audioAutoplayAttempt();
    const raw = rawValue.trim();
    if (!raw) {
      return;
    }

    history.push(raw);
    historyIndex = history.length;
    print(`> ${raw}`, "command");

    const parts = raw.split(/\s+/);
    const verb = parts.shift().toLowerCase();

    switch (verb) {
      case "help":
      case "?":
        showHelp();
        break;
      case "patients":
      case "patient":
        showPatients();
        break;
      case "open":
        openPatient(parts.join(" "));
        break;
      case "scan":
      case "status":
        showScan();
        break;
      case "ls":
      case "dir":
        printBlock(formatFileList());
        break;
      case "cat":
      case "read":
        showFile(parts[0]);
        break;
      case "hack": {
        const recordId = parts.shift();
        hack(recordId, parts.join(" "));
        break;
      }
      case "connect": {
        const nodeId = parts.shift();
        connectNode(nodeId, parts.join(" "));
        break;
      }
      case "audio":
        if ((parts[0] || "on").toLowerCase() === "off") {
          stopAudio();
        } else {
          await startAudio();
        }
        break;
      case "clear":
      case "cls":
        output.textContent = "";
        break;
      case "reset":
        resetState();
        output.textContent = "";
        boot();
        break;
      default:
        print(`bad command or file not executable: ${verb}`, "error");
        print("type help", "system");
        jolt();
    }
  }

  function boot() {
    let delay = 0;
    for (const line of bootLines) {
      window.setTimeout(() => print(line, "system"), delay);
      delay += line ? 95 + Math.floor(Math.random() * 85) : 60;
    }
  }

  function completionsFor(value) {
    const fileCompletions = Object.keys(allFiles()).map((path) => `cat ${path}`);
    return [
      "help",
      "patients",
      "open alec-b-wreelan",
      "scan",
      "ls",
      "cat /readme.txt",
      "cat /patients/index.txt",
      `cat ${patientRoot}/manifest.txt`,
      "hack psych-eval ",
      "connect circulation ",
      "hack transfer ",
      "connect relay-grid ",
      ...fileCompletions,
    ].find((item) => item.startsWith(value));
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const command = input.value;
    input.value = "";
    await handleCommand(command);
  });

  input.addEventListener("keydown", (event) => {
    audioAutoplayAttempt();

    if (event.key === "ArrowUp") {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || "";
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || "";
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const match = completionsFor(input.value.trim());
      if (match) {
        input.value = match;
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  });

  document.addEventListener("pointerdown", audioAutoplayAttempt, { once: false });
  document.addEventListener("click", () => input.focus());
  audioToggle.addEventListener("click", () => {
    if (audioWanted && musicBed && !musicBed.paused) {
      stopAudio();
    } else {
      startAudio();
    }
  });

  window.setInterval(() => {
    if (Math.random() > 0.55) {
      jolt();
    }
  }, 4200);

  musicBed.autoplay = true;
  musicBed.loop = true;
  musicBed.volume = 0.34;
  audioAutoplayAttempt();
  boot();
  input.focus();
})();
