import { TextEntry } from "./types";
import {
  UPADESAPANCAM_VERSES,
  UPADESASAHASRI_GADYA_PART1
} from "./upadesasahasriPart1Data";
import { UPADESASAHASRI_GADYA_PART2 } from "./upadesasahasriPart2Data";
import { UPADESASAHASRI_GADYA_PART3 } from "./upadesasahasriPart3Data";
import { UPADESASAHASRI_GADYA_PART4 } from "./upadesasahasriPart4Data";
import { UPADESASAHASRI_GADYA_PART5 } from "./upadesasahasriPart5Data";

export const UPADESASAHASRI_GRANTHA: TextEntry = {
  id: "upadesasahasri",
  title: "Upadeśasāhasrī (Gadyaprabandhaḥ)",
  transliteratedTitle:
    "Upadeśasāhasrī — Gadyaprabandhaḥ (उपदेशसाहस्री — गद्यप्रबन्धः)",
  author: "Śrīmad Ādi Śaṅkarācārya (श्रीमच्छङ्करभगवत्पूज्यपादः)",
  century: "8th Century CE",
  school: "Advaita Vedānta (Kevalādvaita — Śaṅkara Paramparā)",
  paramparaId: "advaita",
  schoolTag: "Prakaraṇa Grantha",
  foundationalText:
    "The Prose Section of A Thousand Teachings (Upadeśapañcakam vv. 1–5 + 3 Prakaraṇas / 116 Prose Sections + Colophon)",
  totalVersesOrSutras:
    "5 Upadeśapañcakam Ślokas + 116 Prose Sections across 3 Prakaraṇas (121 Entries)",
  language: "Classical Philosophical Sanskrit Prose & Verse (संस्कृतम्)",
  scriptStyle:
    "Traditional Gadyaprabandha Recension with Upadeśapañcakam & Advaita Vivaraṇa",
  description:
    "The Upadeśasāhasrī ('A Thousand Teachings') is the only major independent non-commentarial treatise (Prakaraṇa Grantha) universally acknowledged by modern and traditional scholarship alike as an authentic work of Bhagavān Ādi Śaṅkarācārya, disciple of Śrī Govinda Bhagavatpūjyapāda. This edition presents the complete Gadyaprabandha (Prose Part) in 116 numbered sections across its three classical chapters—Śiṣyānuśāsanaprakaraṇam (§§ 1–44, on teacher/student qualifications, scriptural definitions of Brahman, cosmogony as clear water and foam, and incompatibility of ritual works with non-dual realization), Kūṭasthādvayātmabodhaprakaraṇam / Avagati (§§ 45–111, the celebrated Guru–Disciple dialogue analyzing superimposition, deep sleep, self-luminosity, and immutable Awareness), and Parisaṁkhyānaprakaraṇam (§§ 112–116, on contemplative immunity from all five sense modalities)—together with the five verses of Upadeśapañcakam preserved at the opening of the manuscript.",
  refutationsDet:
    "Refutes Jñāna-karma-samuccaya (combining ritual duties and yajñopavīta insignia with non-dual Self-realization); demolishes Nyāya-Vaiśeṣika notions of Consciousness as an adventitious attribute of an inert soul; refutes Vaināśika (Śūnyavāda) nihilism via the space analogy; dissolves the paradox of pain residing in the Self by proving pain belongs to the perceived body and intellect; and eliminates infinite regress in self-cognition.",
  supportsDet:
    "Establishes Kevalādvaita Anirvacanīya Vivartavāda ('nāma-rūpayoḥ tattvānyatvābhyām anirvacanīyayoḥ'); Kūṭastha-nitya-svayaṁjyotiḥ-avagati (immutable, self-luminous Awareness unfailing even in deep sleep); Ābhāsa (reflection of Awareness in mental states); Dṛg-Dṛśya-Viveka; and Parisaṁkhyāna meditative equanimity.",
  chapters: [
    {
      id: "up-ch0",
      chapterTitle:
        "Prefatory Verses: Upadeśapañcakam (Sādhanapañcakam, Verses 1–5)",
      chapterTitleSanskrit:
        "उपदेशपञ्चकम् (साधनपञ्चकम् — श्लोकाः १–५)",
      summary:
        "Five programmatic Śārdūlavikrīḍita verses preserved at the head of this manuscript summarizing the entire Advaitic path: daily Vedic study and desireless duty, approaching a living preceptor, scripturally guided reflection (Manana), daily simplicity and equanimity, and silent abidance in solitude as Parabrahman.",
      verses: UPADESAPANCAM_VERSES
    },
    {
      id: "up-ch1",
      chapterTitle:
        "Prakaraṇa 1: Śiṣyānuśāsanaprakaraṇam (§§ 1–44)",
      chapterTitleSanskrit:
        "प्रथमं प्रकरणम् — शिष्यानुशासनप्रकरणम् (गद्यानि १–४४)",
      summary:
        "Instruction for Disciple & Preceptor (§§ 1–44): Qualifications and pedagogical compassion; 17 Śruti and 8 Smṛti definitions of Brahman; the existential dialogue 'Who are you?'; unfolding of unmanifest name-and-form like foam from clear water; refutation of ritual agency and dualism; and phenomenological proof that pain belongs solely to the perceived body and intellect.",
      verses: [
        ...UPADESASAHASRI_GADYA_PART1,
        ...UPADESASAHASRI_GADYA_PART2
      ]
    },
    {
      id: "up-ch2",
      chapterTitle:
        "Prakaraṇa 2: Kūṭasthādvayātmabodhaprakaraṇam — Avagati (§§ 45–111)",
      chapterTitleSanskrit:
        "द्वितीयं प्रकरणम् — कूटस्थाद्वयात्मबोधप्रकरणम् / अवगतिः (गद्यानि ४५–१११)",
      summary:
        "The Great Guru–Disciple Dialogue on Immutable Non-Dual Self-Awareness (§§ 45–111): Diagnosis of avidyā; beginningless fused superimposition (nirantarāvivikta-pratyaya); refutation of Vaināśika nihilism and composite soul theories; Ābhāsa reflection in mental acts; persistence of Vision in deep sleep; linguistic parity of 'mountains stand' and 'the Self knows'; and the student's final realization 'Om!'",
      verses: [
        ...UPADESASAHASRI_GADYA_PART3,
        ...UPADESASAHASRI_GADYA_PART4
      ]
    },
    {
      id: "up-ch3",
      chapterTitle:
        "Prakaraṇa 3: Parisaṁkhyānaprakaraṇam (§§ 112–116 & Colophon)",
      chapterTitleSanskrit:
        "तृतीयं प्रकरणम् — परिसंख्यानप्रकरणम् (गद्यानि ११२–११६)",
      summary:
        "The Method of Contemplative Exclusion (§§ 112–116 & Colophon): Severing the chain of ignorance, passions, action, and rebirth; categorical separation of the Witness from all five sense-fields; inner immunity from praise, blame, heat, cold, and pleasure or pain; and rising beyond friend, foe, or neutral in non-dual Upaniṣadic contemplation.",
      verses: UPADESASAHASRI_GADYA_PART5
    }
  ]
};
