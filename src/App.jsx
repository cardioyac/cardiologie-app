import { useState, useMemo } from "react";
 
const cardiologyTopics = [
  {
    id: 1,
    letter: "A",
    title: "Arythmie cardiaque",
    subtitle: "Troubles du rythme",
    tags: ["ECG", "Holter", "Antiarythmiques"],
    icon: "⚡",
    epidemiologie: "Les arythmies cardiaques touchent des millions de personnes dans le monde. La fibrillation auriculaire, forme la plus fréquente, affecte environ 1 à 2 % de la population générale, avec une prévalence croissante avec l'âge.",
    physiopathologie: "Les arythmies résultent d'anomalies de la formation ou de la conduction de l'influx électrique cardiaque. Elles peuvent être dues à un automatisme anormal, à des phénomènes de réentrée ou à des troubles de la conduction auriculo-ventriculaire.",
    diagnostique: "L'ECG de surface est l'examen clé. Un holter-ECG sur 24h ou plus permet de capturer des arythmies paroxystiques. L'exploration électrophysiologique (EEP) est indiquée dans les formes complexes.",
    traitement: "Le traitement dépend du type d'arythmie : antiarythmiques (bêtabloquants, amiodarone), cardioversion électrique, ablation par radiofréquence ou implantation d'un pacemaker ou défibrillateur selon les cas.",
  },
  {
    id: 2,
    letter: "A",
    title: "Athérosclérose",
    subtitle: "Maladie artérielle",
    tags: ["Statines", "Plaque", "LDL"],
    icon: "🩸",
    epidemiologie: "Première cause de mortalité cardiovasculaire dans les pays occidentaux. Elle débute dès l'enfance et progresse silencieusement pendant des décennies avant de se manifester cliniquement à l'âge adulte.",
    physiopathologie: "Formation de plaques d'athérome dans la paroi artérielle par accumulation de lipides, de cellules inflammatoires et de tissu fibreux. La rupture de plaque déclenche une thrombose aiguë responsable des syndromes coronariens aigus.",
    diagnostique: "Bilan lipidique (LDL, HDL, triglycérides), échographie vasculaire (épaisseur intima-média), score calcique coronaire, coronarographie en cas de suspicion de coronaropathie.",
    traitement: "Statines (réduction du LDL), antiagrégants plaquettaires, contrôle des facteurs de risque (HTA, diabète, tabagisme), régime méditerranéen, activité physique régulière et revascularisation si nécessaire.",
  },
  {
    id: 3,
    letter: "B",
    title: "Bloc auriculo-ventriculaire",
    subtitle: "Trouble de conduction",
    tags: ["BAV", "ECG", "Pacemaker"],
    icon: "🔌",
    epidemiologie: "Le BAV du premier degré est fréquent (environ 1–2 % de la population générale). Les BAV de haut degré sont plus rares mais potentiellement graves, surtout chez le sujet âgé ou en contexte d'infarctus.",
    physiopathologie: "Ralentissement ou interruption de la transmission de l'influx électrique entre oreillettes et ventricules au niveau du nœud auriculo-ventriculaire ou du faisceau de His. Peut être fonctionnel, dégénératif, ischémique ou médicamenteux.",
    diagnostique: "ECG : allongement du PR (BAV 1°), ondes P bloquées avec ou sans progression (BAV 2° Mobitz I ou II), dissociation auriculo-ventriculaire complète (BAV 3°). Holter-ECG pour les formes paroxystiques.",
    traitement: "BAV 1° : surveillance. BAV 2° Mobitz II et BAV 3° : implantation d'un pacemaker définitif. En urgence : atropine IV ou entraînement électrosystolique externe.",
  },
  {
    id: 4,
    letter: "C",
    title: "Cardiomyopathie dilatée",
    subtitle: "Maladie du myocarde",
    tags: ["Échocardiographie", "FE", "IEC"],
    icon: "🫀",
    epidemiologie: "Prévalence estimée à 1 sur 250 à 500 personnes. Principale indication de transplantation cardiaque dans les pays développés. Touche préférentiellement l'homme entre 20 et 60 ans.",
    physiopathologie: "Dilatation et dysfonction systolique du ventricule gauche sans cause coronarienne ou valvulaire. Origine génétique (25–35 %), virale (myocardite), toxique (alcool, anthracyclines), ou idiopathique.",
    diagnostique: "Échocardiographie : dilatation VG, fraction d'éjection abaissée (< 40 %). IRM cardiaque pour préciser l'étiologie. BNP/NT-proBNP élevés. Bilan génétique si forme familiale suspectée.",
    traitement: "IEC ou ARA2, bêtabloquants, antagonistes de l'aldostérone, diurétiques. Défibrillateur implantable si FE < 35 % malgré traitement optimal. Resynchronisation cardiaque si QRS élargis. Transplantation en dernier recours.",
  },
  {
    id: 5,
    letter: "C",
    title: "Cardiopathie ischémique",
    subtitle: "Coronaropathie",
    tags: ["Coronarographie", "Stent", "Angor"],
    icon: "💔",
    epidemiologie: "Première cause de mortalité mondiale. En France, environ 120 000 infarctus par an. Prévalence de l'angor stable estimée à 3–4 % de la population adulte, augmentant avec l'âge.",
    physiopathologie: "Réduction du flux sanguin coronaire par sténose athéromateuse fixe (angor stable) ou rupture de plaque avec thrombose (syndrome coronarien aigu). L'ischémie myocardique résulte du déséquilibre entre apports et besoins en oxygène.",
    diagnostique: "ECG (sus/sous-décalage ST), troponines (nécrose), test d'ischémie (épreuve d'effort, scintigraphie, IRM de stress), coronarographie pour confirmer et localiser les lésions.",
    traitement: "Angioplastie coronaire percutanée avec pose de stent en urgence pour les SCA. Pontage aorto-coronarien pour les lésions pluritronculaires complexes. Traitement médical : antiagrégants, statines, bêtabloquants, IEC.",
  },
  {
    id: 6,
    letter: "E",
    title: "Embolie pulmonaire",
    subtitle: "Urgence vasculaire",
    tags: ["Anticoagulants", "Héparine", "TEP"],
    icon: "🫁",
    epidemiologie: "Incidence de 60 à 70 cas pour 100 000 personnes par an en Europe. Troisième cause de mortalité cardiovasculaire après l'infarctus et l'AVC. Mortalité précoce de 5–10 % dans les formes à haut risque.",
    physiopathologie: "Obstruction d'une ou plusieurs artères pulmonaires par un thrombus, le plus souvent d'origine veineuse profonde des membres inférieurs (TVP). Entraîne une hypertension pulmonaire aiguë et une défaillance ventriculaire droite.",
    diagnostique: "Score de Wells pour évaluer la probabilité clinique. D-dimères si probabilité faible. Angio-scanner thoracique (gold standard). Échocardiographie pour évaluer le retentissement sur le VD.",
    traitement: "Anticoagulation immédiate par héparine puis relais par anticoagulants oraux (AOD en première intention). Thrombolyse systémique ou embolectomie chirurgicale en cas de choc ou d'arrêt cardiaque.",
  },
  {
    id: 7,
    letter: "E",
    title: "Endocardite infectieuse",
    subtitle: "Infection valvulaire",
    tags: ["Hémocultures", "Antibiotiques", "Chirurgie"],
    icon: "🦠",
    epidemiologie: "Incidence de 3 à 7 cas pour 100 000 personnes par an. Mortalité hospitalière de 15–25 %. Plus fréquente chez l'homme, le sujet âgé, les porteurs de prothèses valvulaires et les usagers de drogues intraveineuses.",
    physiopathologie: "Colonisation de l'endocarde par des micro-organismes (surtout streptocoques et staphylocoques) avec formation de végétations friables pouvant emboliser. Favorisée par des lésions valvulaires préexistantes ou des prothèses.",
    diagnostique: "Critères de Duke : hémocultures positives + imagerie (échocardiographie transthoracique et trans-oesophagienne, scanner, PET-scan). Au moins 3 paires d'hémocultures avant toute antibiothérapie.",
    traitement: "Antibiothérapie bactéricide prolongée (4–6 semaines) adaptée au germe. Chirurgie (remplacement valvulaire) indiquée en cas d'insuffisance cardiaque, d'abcès, de végétations volumineuses ou d'échec du traitement médical.",
  },
  {
    id: 8,
    letter: "F",
    title: "Fibrillation auriculaire",
    subtitle: "Arythmie fréquente",
    tags: ["FA", "Anticoagulation", "Cardioversion"],
    icon: "〰️",
    epidemiologie: "Arythmie cardiaque soutenue la plus fréquente : 1–2 % de la population générale, 10 % après 80 ans. Multiplie par 5 le risque d'AVC ischémique et par 2 la mortalité cardiovasculaire.",
    physiopathologie: "Activation électrique anarchique des oreillettes par multiples circuits de micro-réentrée, entraînant une contraction inefficace et une stase sanguine dans l'auricule gauche, source de thrombus et d'embolies.",
    diagnostique: "ECG : absence d'ondes P, rythme irrégulier, trémulation de la ligne isoélectrique. Holter si paroxystique. Échocardiographie pour rechercher une cardiopathie sous-jacente et évaluer la fonction VG.",
    traitement: "Anticoagulation au long cours (AOD ou AVK selon le score CHA₂DS₂-VASc). Contrôle de la fréquence (bêtabloquants, digoxine) ou du rythme (cardioversion, ablation par radiofréquence de l'ostium des veines pulmonaires).",
  },
  {
    id: 9,
    letter: "H",
    title: "Hypertension artérielle",
    subtitle: "Facteur de risque majeur",
    tags: ["HTA", "Antihypertenseurs", "MAPA"],
    icon: "📈",
    epidemiologie: "Touche environ 30 % des adultes dans le monde, soit plus d'un milliard de personnes. Principal facteur de risque modifiable d'AVC, d'infarctus, d'insuffisance cardiaque et d'insuffisance rénale chronique.",
    physiopathologie: "Élévation chronique des résistances vasculaires périphériques, souvent multifactorielle (génétique, surpoids, sédentarité, excès de sel, stress). Entraîne une hypertrophie ventriculaire gauche, une artériosclérose et une atteinte des organes cibles.",
    diagnostique: "Mesure répétée ≥ 140/90 mmHg au cabinet. MAPA ou automesure tensionnelle pour confirmer et éliminer l'effet blouse blanche. Bilan des atteintes d'organes cibles (ECG, fond d'œil, créatinine, microalbuminurie).",
    traitement: "Règles hygiéno-diététiques (réduction du sel, perte de poids, activité physique). Médicaments de première ligne : IEC ou ARA2, inhibiteurs calciques, diurétiques thiazidiques. Objectif tensionnel < 130/80 mmHg.",
  },
  {
    id: 10,
    letter: "I",
    title: "Insuffisance cardiaque",
    subtitle: "Syndrome complexe",
    tags: ["FE", "BNP", "Diurétiques"],
    icon: "💧",
    epidemiologie: "Affecte plus de 64 millions de personnes dans le monde. Prévalence de 1–2 % en Europe, atteignant 10 % chez les plus de 70 ans. Mortalité à 5 ans d'environ 50 %, comparable à de nombreux cancers.",
    physiopathologie: "Incapacité du cœur à assurer un débit adapté aux besoins métaboliques. Peut être systolique (FE abaissée) ou diastolique (FE préservée). Activation neuro-hormonale compensatrice (SRAA, système sympathique) aggrave progressivement la maladie.",
    diagnostique: "Clinique : dyspnée, œdèmes, orthopnée. BNP ou NT-proBNP élevés. Échocardiographie pour mesurer la FE et identifier la cause. Radiographie thoracique (cardiomégalie, épanchement pleural).",
    traitement: "Pour la FE abaissée : IEC/ARA2/ARNI, bêtabloquants, antagonistes de l'aldostérone, gliflozines. Diurétiques pour la congestion. Défibrillateur et resynchronisation selon les critères. Transplantation cardiaque en phase terminale.",
  },
  {
    id: 11,
    letter: "I",
    title: "Infarctus du myocarde",
    subtitle: "Occlusion coronaire aiguë",
    tags: ["IDM", "STEMI", "Angioplastie"],
    icon: "🚨",
    epidemiologie: "Environ 700 000 cas par an en Europe. Mortalité hospitalière réduite à < 5 % grâce aux filières de soins modernes, mais reste une cause majeure de décès prématurés et d'insuffisance cardiaque séquellaire.",
    physiopathologie: "Occlusion thrombotique aiguë d'une artère coronaire, le plus souvent par rupture d'une plaque d'athérome instable. La nécrose myocardique débute après 20 minutes d'ischémie totale et progresse de l'endocarde vers l'épicarde.",
    diagnostique: "Douleur thoracique typique + sus-décalage du segment ST (STEMI) ou sans sus-décalage (NSTEMI). Élévation de la troponine (hypersensible). Coronarographie en urgence pour confirmer et traiter l'occlusion.",
    traitement: "Angioplastie primaire dans les 90 minutes (STEMI) ou dans les 24–72h (NSTEMI à haut risque). Antiagrégants plaquettaires doubles (aspirine + inhibiteur P2Y12), anticoagulants, statines à haute dose, bêtabloquants, IEC.",
  },
  {
    id: 12,
    letter: "P",
    title: "Péricardite",
    subtitle: "Inflammation péricardique",
    tags: ["AINS", "Colchicine", "Frottement"],
    icon: "🔥",
    epidemiologie: "Représente 5 % des consultations aux urgences pour douleur thoracique non ischémique. Touche préférentiellement les adultes jeunes (20–50 ans). Risque de récidive de 15–30 % après un premier épisode.",
    physiopathologie: "Inflammation du péricarde, le plus souvent d'origine virale (entérovirus, CMV, EBV) ou idiopathique. Peut également être bactérienne, auto-immune (lupus, PR), néoplasique ou post-radique. L'inflammation peut entraîner un épanchement péricardique.",
    diagnostique: "Triade clinique : douleur thoracique positionnelle, frottement péricardique à l'auscultation, anomalies ECG diffuses (sus-décalage ST concave + sous-décalage PR). Échocardiographie pour détecter un épanchement.",
    traitement: "AINS (ibuprofène ou aspirine) + colchicine pendant 3 mois pour réduire les récidives. Repos sportif obligatoire. Corticoïdes en cas d'échec ou de cause spécifique. Drainage péricardique si tamponnade associée.",
  },
  {
    id: 13,
    letter: "S",
    title: "Sténose aortique",
    subtitle: "Valvulopathie",
    tags: ["TAVI", "Gradient", "Surface valvulaire"],
    icon: "🚪",
    epidemiologie: "Valvulopathie la plus fréquente dans les pays développés. Prévalence de 2–3 % après 65 ans, jusqu'à 10 % après 80 ans. Principale indication de remplacement valvulaire en Europe et en Amérique du Nord.",
    physiopathologie: "Calcification progressive des feuillets valvulaires aortiques entraînant une obstruction à l'éjection du ventricule gauche. Génère une hypertrophie concentrique VG compensatrice, puis une dysfonction et une dilatation à un stade avancé.",
    diagnostique: "Souffle systolique éjectif au foyer aortique irradiant dans les carotides. Échocardiographie Doppler : gradient moyen, surface valvulaire (sévère si < 1 cm²), FE. Cathétérisme si discordances.",
    traitement: "Remplacement valvulaire aortique chirurgical (RVAC) ou par voie percutanée (TAVI) en cas de sténose sévère symptomatique. Le TAVI est désormais indiqué à tous les âges selon le profil de risque chirurgical.",
  },
  {
    id: 14,
    letter: "T",
    title: "Tamponnade cardiaque",
    subtitle: "Urgence péricardique",
    tags: ["Péricardiocentèse", "Épanchement", "Beck"],
    icon: "⚠️",
    epidemiologie: "Urgence rare mais potentiellement fatale. Peut compliquer toute péricardite, un traumatisme thoracique, une dissection aortique, une néoplasie ou une procédure cardiaque invasive. Incidence exacte difficile à estimer.",
    physiopathologie: "Accumulation rapide de liquide dans le péricarde comprimant les cavités cardiaques droites, puis gauches, réduisant le remplissage ventriculaire et le débit cardiaque. La vitesse d'accumulation est plus importante que le volume.",
    diagnostique: "Triade de Beck : hypotension, turgescence jugulaire, bruits du cœur assourdis. Pouls paradoxal (chute inspiratoire de la PA > 10 mmHg). Échocardiographie en urgence : épanchement + collapsus des cavités droites.",
    traitement: "Péricardiocentèse en urgence (guidée par échographie de préférence). Expansion volémique en attente du geste. Traitement de la cause sous-jacente. Fenêtre péricardique chirurgicale en cas de récidive ou d'hémopéricarde.",
  },
  {
    id: 15,
    letter: "T",
    title: "Tachycardie ventriculaire",
    subtitle: "Arythmie grave",
    tags: ["TV", "Défibrillateur", "Amiodarone"],
    icon: "⚡",
    epidemiologie: "La TV soutenue affecte principalement les patients avec cardiopathie ischémique séquellaire (cicatrice d'infarctus). Responsable d'une proportion importante des morts subites cardiaques, estimées à 300 000 cas/an en Europe.",
    physiopathologie: "Rythme cardiaque rapide (> 100 bpm) d'origine ventriculaire, souvent par mécanisme de réentrée autour d'une cicatrice myocardique. Peut dégénérer en fibrillation ventriculaire et arrêt cardiaque si non traitée rapidement.",
    diagnostique: "ECG : tachycardie à complexes larges (QRS > 120 ms), dissociation auriculo-ventriculaire, captures et fusions. Exploration électrophysiologique pour cartographier et guider l'ablation.",
    traitement: "TV bien tolérée : cardioversion électrique ou amiodarone IV. TV mal tolérée/FV : choc électrique externe immédiat. Au long cours : défibrillateur implantable (DAI) + amiodarone. Ablation par cathéter pour les TV récidivantes.",
  },
];
 
const ACCENT = "#C0392B";
const SECTIONS = [
  { key: "epidemiologie", label: "Épidémiologie" },
  { key: "physiopathologie", label: "Physiopathologie" },
  { key: "diagnostique", label: "Diagnostique" },
  { key: "traitement", label: "Traitement" },
];
 
export default function CardiologyApp() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [activeSection, setActiveSection] = useState("epidemiologie");
  const [images, setImages] = useState({});
 
  const handleImageUpload = (topicId, e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => ({
          ...prev,
          [topicId]: [...(prev[topicId] || []), { url: ev.target.result, caption: file.name }],
        }));
      };
      reader.readAsDataURL(file);
    });
  };
 
  const handleDeleteImage = (topicId, index) => {
    setImages((prev) => {
      const updated = [...(prev[topicId] || [])];
      updated.splice(index, 1);
      return { ...prev, [topicId]: updated };
    });
  };
 
  const alphabet = [...new Set(cardiologyTopics.map((t) => t.letter))].sort();
 
  const filtered = useMemo(() => {
    return cardiologyTopics.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchLetter = activeLetter ? t.letter === activeLetter : true;
      return matchSearch && matchLetter;
    });
  }, [search, activeLetter]);
 
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((t) => {
      if (!groups[t.letter]) groups[t.letter] = [];
      groups[t.letter].push(t);
    });
    return groups;
  }, [filtered]);
 
  const selectedTopic = activeCard ? cardiologyTopics.find((t) => t.id === activeCard) : null;
 
  const openModal = (id) => {
    setActiveCard(id);
    setActiveSection("epidemiologie");
  };
 
  return (
    <div style={{ minHeight: "100vh", background: "#F7F4F0", fontFamily: "'Georgia', serif", color: "#1A1A1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
 
        .header-bg { background: #FFFFFF; border-bottom: 1px solid #E8E0D8; }
 
        .search-input {
          background: #F7F4F0;
          border: 1px solid #DDD5CC;
          border-radius: 6px;
          color: #1A1A1A;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 10px 16px 10px 36px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input::placeholder { color: #B0A89E; }
        .search-input:focus { border-color: ${ACCENT}; background: #fff; }
 
        .letter-btn {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          padding: 6px 12px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
          color: #A09080;
          letter-spacing: 0.05em;
        }
        .letter-btn:hover { color: ${ACCENT}; border-color: #EADDD5; background: #FDF5F3; }
        .letter-btn.active { color: ${ACCENT}; border-color: ${ACCENT}60; background: #FDF0EE; }
 
        .topic-card {
          background: #FFFFFF;
          border: 1px solid #EDE6DF;
          border-radius: 8px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .topic-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.2s;
          border-radius: 8px 0 0 8px;
        }
        .topic-card:hover { border-color: #DDD0C8; box-shadow: 0 2px 12px rgba(0,0,0,0.07); transform: translateY(-1px); }
        .topic-card:hover::before { background: ${ACCENT}; }
        .topic-card.selected { border-color: ${ACCENT}50; box-shadow: 0 2px 16px rgba(192,57,43,0.1); }
        .topic-card.selected::before { background: ${ACCENT}; }
 
        .letter-group-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          font-weight: 700;
          color: #C0392B;
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -0.03em;
          user-select: none;
          border-left: 5px solid #C0392B;
          padding-left: 18px;
        }
 
        .tag-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          padding: 3px 9px;
          background: #F2EDE8;
          border-radius: 3px;
          color: #8C7B6E;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
 
        .stat-box {
          background: #F7F4F0;
          border: 1px solid #EDE6DF;
          border-radius: 6px;
          padding: 12px 20px;
          text-align: center;
        }
 
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26,20,16,0.4);
          backdrop-filter: blur(4px);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 
        .modal-card {
          background: #FFFFFF;
          border: 1px solid #EDE6DF;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
 
        .modal-header {
          padding: 32px 32px 0;
          position: sticky;
          top: 0;
          background: #FFFFFF;
          z-index: 10;
          border-radius: 12px 12px 0 0;
        }
 
        .modal-body { padding: 0 32px 32px; }
 
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #F7F4F0;
          border: 1px solid #EDE6DF;
          border-radius: 4px;
          color: #A09080;
          cursor: pointer;
          font-size: 18px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          z-index: 20;
        }
        .close-btn:hover { border-color: ${ACCENT}50; color: ${ACCENT}; background: #FDF0EE; }
 
        .section-tab {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid #EDE6DF;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s;
          color: #A09080;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .section-tab:hover { border-color: #DDD0C8; color: #5A4A40; }
        .section-tab.active { background: #FDF0EE; border-color: ${ACCENT}50; color: ${ACCENT}; }
 
        .upload-zone {
          display: block;
          border: 2px dashed #DDD5CC;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #FDFAF8;
        }
        .upload-zone:hover { border-color: #C0392B60; background: #FDF5F3; }
        .upload-zone input { display: none; }
        .img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 12px; }
        .img-item { position: relative; border-radius: 6px; overflow: hidden; border: 1px solid #EDE6DF; }
        .img-item img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .img-delete {
          position: absolute; top: 6px; right: 6px;
          background: rgba(255,255,255,0.92); border: 1px solid #EDE6DF;
          border-radius: 3px; width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px; color: #A09080; transition: all 0.15s;
        }
        .img-delete:hover { background: #FDF0EE; color: #C0392B; border-color: #C0392B50; }
        .img-caption { padding: 5px 8px; font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #A09080; background: #FDFAF8; letter-spacing: 0.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
 
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #DDD5CC; border-radius: 2px; }
      `}</style>
 
      {/* HEADER */}
      <div className="header-bg" style={{ padding: "40px 32px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#B08070", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              v1.0 — Référentiel clinique
            </span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 8, color: "#1A1A1A" }}>
            Cardiologie
            <span style={{ color: ACCENT, fontStyle: "italic" }}> Clinique</span>
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#A09080", fontStyle: "italic", marginBottom: 32 }}>
            Pathologies cardiovasculaires — classification alphabétique
          </p>
 
          <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { label: "Pathologies", value: cardiologyTopics.length },
              { label: "Lettres", value: alphabet.length },
              { label: "Affichées", value: filtered.length },
            ].map((s) => (
              <div key={s.label} className="stat-box" style={{ minWidth: 80 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: ACCENT, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#A09080", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
 
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#C0A090", fontSize: 14 }}>⌕</span>
            <input
              className="search-input"
              placeholder="Rechercher une pathologie, un traitement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
 
      {/* ALPHABET NAV */}
      <div style={{ borderBottom: "1px solid #EDE6DF", padding: "12px 32px", background: "#FDFAF8" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button className={`letter-btn ${!activeLetter ? "active" : ""}`} onClick={() => setActiveLetter(null)}>Tous</button>
          {alphabet.map((l) => (
            <button key={l} className={`letter-btn ${activeLetter === l ? "active" : ""}`} onClick={() => setActiveLetter(activeLetter === l ? null : l)}>
              {l}
            </button>
          ))}
        </div>
      </div>
 
      {/* CONTENT */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px" }}>
        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#C0B0A0", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic" }}>
            Aucun résultat trouvé
          </div>
        ) : (
          Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([letter, topics]) => (
            <div key={letter} style={{ marginBottom: 48 }}>
              <div className="letter-group-heading">{letter}</div>
              <div style={{ display: "grid", gap: 12 }}>
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`topic-card ${activeCard === topic.id ? "selected" : ""}`}
                    onClick={() => openModal(topic.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{topic.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", color: "#1A1A1A" }}>{topic.title}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B0A090", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{topic.subtitle}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {topic.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
 
      {/* FULL PAGE DETAIL */}
      {selectedTopic && (
        <div style={{ position: "fixed", inset: 0, background: "#F7F4F0", zIndex: 50, overflowY: "auto", animation: "slideInPage 0.25s ease" }}>
          <style>{`@keyframes slideInPage { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
 
          {/* Top bar */}
          <div style={{ position: "sticky", top: 0, background: "#FFFFFF", borderBottom: "1px solid #EDE6DF", zIndex: 10, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setActiveCard(null)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer", color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.06em", padding: "6px 0" }}
            >
              ← Retour
            </button>
            <div style={{ height: 16, width: 1, background: "#EDE6DF" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#1A1A1A", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {selectedTopic.title}
            </span>
            <span style={{ fontSize: 22 }}>{selectedTopic.icon}</span>
          </div>
 
          {/* Hero */}
          <div style={{ background: "#FFFFFF", padding: "28px 24px 24px", borderBottom: "1px solid #EDE6DF" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B08070", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
              {selectedTopic.subtitle}
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#1A1A1A", marginBottom: 16 }}>
              {selectedTopic.title}
            </h1>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {selectedTopic.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "4px 12px", background: "#FDF0EE", border: `1px solid ${ACCENT}30`, borderRadius: 3, color: ACCENT }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
 
          {/* Section tabs */}
          <div style={{ background: "#FDFAF8", borderBottom: "1px solid #EDE6DF", padding: "12px 24px", display: "flex", gap: 8, overflowX: "auto" }}>
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                className={`section-tab ${activeSection === s.key ? "active" : ""}`}
                onClick={() => setActiveSection(s.key)}
                style={{ flexShrink: 0 }}
              >
                {s.label}
              </button>
            ))}
          </div>
 
          {/* Content */}
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: ACCENT, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: "#2A1A10", lineHeight: 1.9 }}>
              {selectedTopic[activeSection]}
            </p>
 
            {/* Images */}
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #EDE6DF" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B0A090", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                Images — {images[selectedTopic.id]?.length || 0} photo{(images[selectedTopic.id]?.length || 0) !== 1 ? "s" : ""}
              </div>
              <label className="upload-zone">
                <input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(selectedTopic.id, e)} />
                <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#8C7B6E", fontStyle: "italic" }}>Appuyez pour ajouter une photo</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#C0B0A0", marginTop: 4, letterSpacing: "0.06em" }}>ECG · Écho · Radio · Schéma</div>
              </label>
              {images[selectedTopic.id]?.length > 0 && (
                <div className="img-grid" style={{ marginTop: 16 }}>
                  {images[selectedTopic.id].map((img, i) => (
                    <div key={i} className="img-item">
                      <img src={img.url} alt={img.caption} style={{ height: 160 }} />
                      <button className="img-delete" onClick={() => handleDeleteImage(selectedTopic.id, i)}>×</button>
                      <div className="img-caption">{img.caption}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
 
            <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #EDE6DF" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#C0B0A0", fontStyle: "italic" }}>
                Application à vocation éducative — Toujours se référer aux recommandations de la Société Européenne de Cardiologie (ESC).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
