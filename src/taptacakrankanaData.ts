import { TextEntry } from "./types";
import { TAPTACAKRANKANA_PART1_VERSES } from "./taptacakrankanaPart1Data";
import { TAPTACAKRANKANA_PART2_VERSES } from "./taptacakrankanaPart2Data";
import { TAPTACAKRANKANA_PART3_VERSES } from "./taptacakrankanaPart3Data";

export const TAPTACAKRANKANA_GRANTHA: TextEntry = {
  id: "taptacakrankanavidhvamsanam",
  title: "तप्तचक्रांकनविध्वंसनम्",
  transliteratedTitle: "Taptacakrāṅkanavidhvaṁsanam (तप्तचक्रांकनविध्वंसनम्)",
  author: "Śrī Garuḍācala Yajvā (Veluveṇṭi Lineage, Veṅkaṭagiri Saṁsthāna)",
  century: "Classical Post-Śaṅkara Tradition",
  school: "Śāṅkarādvaita / Smārta-Mīmāṁsā",
  paramparaId: "advaita",
  foundationalText: "Śāstrārtha & Mīmāṁsā-Dharmaśāstra Khandana Grantha",
  totalVersesOrSutras: "10 Analytical Prakaraṇas (Complete Treatise)",
  description:
    "A rigorous Śāṅkarādvaita Smārta-Mīmāṁsā polemical treatise composed by Śrī Veluveṇṭi Garuḍācala Yajvā of the Veṅkaṭagiri Saṁsthāna, opening with salutations to Śrī Jñānaprasūnāmbā-Kālahastīśvara and Jagadguru Ādi Śaṅkarācārya. Systematically dismantling the claim that heated discus-branding (taptacakrāṅkana) has Vedic sanction, it examines the Śrauta and Smārta viniyoga of 'Pavitraṁ te', 'Caraṇaṁ pavitram', 'Lokasya dvāram', and 'Camūṣac chyenaḥ', applies Pāṇinian grammar and the Caraṇa-, Kapiñjala-, Utpattyasambhava-, and Apaśūdra-adhikaraṇas, and marshals Hemādri, Vaidyanāthīya, Smṛticandrikā, and Mādhavācārya's Parāśara-Anukramaṇikā.",
  refutationsDet:
    "Refutes Pāñcarātra and Taptamudrāvādin claims (including Saccaritra-rakṣā arguments) that RV/Taittirīya mantras enjoin branding human shoulders with heated metal; exposes fabricated/unattested Śruti citations ('Puṣkala-saṁhitā', 'Kaṭhavallī', 'Bṛhadāraṇyaka'), strained lakṣaṇā and adhyāhāra, invalid nighaṇṭu claims, and the interpolated 'Parāśara-smṛti Uttara-khaṇḍa'.",
  supportsDet:
    "Establishes Pūrva-Mīmāṁsā viniyoga-concordance across Śrauta (Droṇakalaśa, Kāṭhaka Apāgha Caraṇeṣṭi) and Smārta temple consecration rites, Brahmasūtra verdicts (Caraṇādhikaraṇa, Utpattyasambhavādhikaraṇa, Apaśūdrādhikaraṇa), Manu's primacy via Smṛticandrikā, and the preservation of Smārta-Śāṅkarādvaita Vaidika discipline.",
  chapters: [
    {
      id: "tcv-ch-1",
      chapterTitle: "Maṅgalācaraṇam, Pūrvapakṣa & Mantra-Viniyoga",
      chapterTitleSanskrit: "१. मङ्गलाचरणं पूर्वपक्षः श्रौतस्मार्तविनियोगश्च (प्रकरणानि १–४)",
      summary:
        "Invocations to Śrī Kālahastīśvara and Ādi Śaṅkarācārya, presentation of the four Śruti mantras cited by Taptamudrāvādins, and proof of their actual Śrauta and Smārta viniyoga.",
      verses: TAPTACAKRANKANA_PART1_VERSES,
    },
    {
      id: "tcv-ch-2",
      chapterTitle: "Mīmāṁsā, Pāṇinian & Brahmasūtra Critique of Branding Construals",
      chapterTitleSanskrit: "२. मन्त्रार्थसमन्वयः तप्तमुद्रावाद्यर्थखण्डनं च (प्रकरणानि ५–७)",
      summary:
        "Unified Śrauta-Smārta interpretation of 'Caraṇaṁ pavitram', 'Lokasya dvāram', and 'Camūṣac chyenaḥ', followed by grammatical, Mīmāṁsā, and Brahmasūtra (Caraṇādhikaraṇa) refutation of forced branding meanings.",
      verses: TAPTACAKRANKANA_PART2_VERSES,
    },
    {
      id: "tcv-ch-3",
      chapterTitle: "Dharmaśāstra Nibandhas, Khila-Śruti Refutation & Colophon",
      chapterTitleSanskrit: "३. निबन्धनप्रमाणानि खिलमन्त्रनिरासः उपसंहारश्च (प्रकरणानि ८–१०)",
      summary:
        "Marshals Hemādri, Vaidyanāthīya, Smṛticandrikā, Mādhavācārya's Parāśara-Anukramaṇikā, and Brahmasūtra Utpattyasambhava- and Apaśūdra-adhikaraṇas to dismantle khila-śruti claims, closing with Garuḍācala Yajvā's colophon.",
      verses: TAPTACAKRANKANA_PART3_VERSES,
    },
  ],
};
