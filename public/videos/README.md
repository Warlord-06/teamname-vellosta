# SignBridge - Verified Video Assets Directory

This folder holds verified sign language video recordings for **SignBridge: Mode B (Text to Sign)**.

## Supported Phrase Video Files

To enable video playback for a phrase, place an authentic sign-language video clip (`.mp4` or `.webm`) in this folder with the matching filename:

| Phrase | Target Filename | Expected Format | Resolution | Recommended Duration |
| :--- | :--- | :--- | :--- | :--- |
| **Hello** | `hello.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–4 seconds (looped) |
| **Thank you** | `thank_you.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–4 seconds (looped) |
| **Help me** | `help_me.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–4 seconds (looped) |
| **How are you?** | `how_are_you.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 3–5 seconds (looped) |
| **I need water** | `need_water.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–4 seconds (looped) |
| **Yes** | `yes.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–3 seconds (looped) |
| **No** | `no.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–3 seconds (looped) |
| **I love you** | `i_love_you.mp4` | MP4 (H.264 / AAC) or WebM | 720p / 1080p | 2–3 seconds (looped) |

---

## Strict Accuracy & Ethics Policy

> [!IMPORTANT]
> **Why SignBridge requires authentic clips:**
> Sign languages (such as ASL, BSL, and ISL) are complete natural languages with intricate grammar, facial expressions (non-manual markers), and precise 3D spatial dynamics. 
> Substituting casual gestures or random stock gestures as "sign language" spreads harmful misinformation. If a verified recording is not present, SignBridge intentionally displays a **Verified Asset Missing Notice** alongside an authentic linguistic step-by-step breakdown rather than guessing or playing an unrelated clip.

---

## Where to Source Authentic ASL Video Clips

1. **ASL University / Lifeprint (Dr. Bill Vicars)**: Educational open-access ASL dictionary.
2. **SpreadTheSign**: International multi-language open sign dictionary.
3. **Handspeak**: Academic ASL linguistic resource.
4. **Custom Recorded Clips**: Record a fluent or certified signer against a neutral backdrop with good lighting, head-to-waist framing, and centered eye level.

---

## Adding New Phrases to the Application

To add a new sign to SignBridge:
1. Open `src/data/signPhrases.js`.
2. Add a new phrase object with:
   - `id`: unique string key
   - `phrase`: display title
   - `aliases`: search keywords
   - `videoPath`: `/videos/<filename>.mp4`
   - `category`: phrase group
   - `handshape`: description of hand shape
   - `steps`: array of numbered linguistic steps
   - `difficulty`: Beginner / Intermediate / Advanced
3. Save the corresponding video file in `public/videos/<filename>.mp4`.
