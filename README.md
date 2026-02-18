# Rehab360 – פרויקט תכנות ווב (Desktop-first + Responsive)

**Rehab360** היא מערכת ווב לניהול תהליך שיקום דיגיטלי, עם שני תפקידי משתמש:
- **Patient** – צפייה בתוכנית טיפול, צפייה/דיווח על תרגילים ומשוב יומי.
- **Physiotherapist** – דשבורד למעקב מטופלים, סטטוסים וניווט למסך פרטי מטופל.

הפרויקט נבנה בגישת **Desktop-first** (מחשב שולחני בדפדפן Chrome) ובמקביל מותאם **רספונסיבית** לטאבלט ולמובייל.

---

## 🎯 מה יש במערכת (מסכים וזרימות)

### מסך פתיחה (Welcome)
- `index.html`  
בחירת תפקיד: Patient / Physiotherapist.

### מסכי Patient
1. `includes/patient-home.html` – דשבורד מטופל (סיכום + “Next Exercise”)
2. `includes/patient-exercises.html` – **My Treatment Plan** (רשימת תרגילים)
3. `includes/report-form.html` – טופס דיווח תרגיל + וידאו YouTube (Embed)

### מסכי Physiotherapist
4. `includes/physio-home.html` – דשבורד פיזיותרפיסט + חיפוש מטופלים
5. `includes/patient-details.html` – מסך פרטי מטופל (Clinical status / Progress וכו’)

**תרחישים (Scenarios) לדוגמה:**
- **תרחיש 1 (Patient):** Welcome → Patient Home → My Treatment Plan → Exercise Report (Form)
- **תרחיש 2 (Physio):** Welcome → Physio Home → Patient Details

---

## 🧰 טכנולוגיות ועקרונות
- **HTML5 סמנטי** (header/nav/main/section וכו’)
- **CSS** בקבצים נפרדים + עיצוב אחיד דרך `global.css`
- **JavaScript (Vanilla)**: לוגיקה כללית, אינטראקציות, דינמיות
- **jQuery**:
  - קליק על כרטיסי תרגילים + מעבר למסך דיווח
  - ולידציות + שליחה ב־AJAX + הודעת הצלחה שנעלמת אחרי כמה שניות
- **PHP + MySQL**:
  - שמירת דיווח טופס ל־DB דרך `includes/exercise_report.php`

---

## 📁 מבנה תיקיות
```
rehab360_merged_flat_v21/
├─ index.html
├─ css/
│  ├─ global.css
│  ├─ welcome.css
│  ├─ patient-home.css
│  ├─ patient-exercises.css
│  ├─ report-form.css
│  └─ physio.css
├─ js/
│  ├─ patient-home.js
│  ├─ exercise.js
│  ├─ form.js
│  └─ physio.js
├─ images/
└─ includes/
   ├─ patient-home.html
   ├─ patient-exercises.html
   ├─ report-form.html
   ├─ physio-home.html
   ├─ patient-details.html
   └─ exercise_report.php
```

---

## ✅ JavaScript / jQuery – מה מומש בפועל (לפי דרישות)
**1) אלמנט שמגיב לאירוע**
- לחיצה על כרטיס תרגיל (`.exercise-card`) + לחיצת כפתור Start בדשבורד המטופל.
- חיפוש מטופלים בזמן אמת במסך Physio.

**2) כתיבה לתוך אלמנט**
- מילוי כותרת/פרטי התרגיל במסך הטופס (`#exerciseTitle`, `#exerciseDetails`).
- הודעת הצלחה/שגיאה בטופס (`#formMessage`).

**3) עיצוב דינמי באמצעות מחלקה**
- פתיחה/סגירה של Side Menu עם `toggleClass("open")`.
- הוספת `field-error` לשדות לא תקינים + יצירת `.error-text`.

**4) קליטת נתונים מהמשתמש**
- טופס Exercise Report (מספרים, textarea, select, radio).
- שדה חיפוש מטופלים במסך Physio.

**5) העברת נתונים בין מסכים באמצעות JS**
- שמירת פרטי התרגיל ב־`sessionStorage` במסך תוכנית הטיפול  
  ואז שליפתם במסך הטופס כדי להציג כותרת/סטים/חזרות + להציב `exercise_id`.

---

## 🧪 ולידציות בטופס (Report Form)
הטופס כולל ולידציות מעבר ל”שדה חובה”:
- Pain: חייב להיות בין **0–10**
- Effort: חייב להיות בין **1–10**
- Notes: אם הוזן – מינימום **5 תווים**
- Not Completed → Reason חובה
- Reason = Other → textarea חובה ומינימום **5 תווים**

בנוסף יש אינטראקציה:
- אם המשתמש בוחר **Completed** מוצגים שדות pain/effort/notes
- אם בוחר **Not Completed** מוצג select לסיבה (+ שדה “Other” רק כשצריך)

---

## 🗄️ שמירת נתונים (PHP + MySQL)
שליחת הטופס מתבצעת ב־AJAX אל:
- `includes/exercise_report.php`

> שים לב: בקובץ ה־PHP יש פרטי התחברות ל־DB (host/user/pass/db). בפרויקט אמיתי זה היה צריך להיות בקובץ config נפרד ולא חשוף.

### דוגמה לסכמה (SQL) ליצירת הטבלה
אם צריך להרים DB מקומי, אפשר להשתמש במשהו בסגנון:

```sql
CREATE TABLE exercise_report (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  exercise_id INT NOT NULL,
  completed TINYINT NOT NULL,
  pain_level INT NULL,
  effort_level INT NULL,
  notes TEXT NULL,
  reason VARCHAR(50) NULL,
  reason_text TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ איך מריצים
### הרצה בסיסית (Frontend בלבד)
- לפתוח `index.html` בדפדפן (Chrome).

### הרצה מלאה עם שמירה ל־DB
- להרים שרת מקומי שתומך **PHP + MySQL** (למשל XAMPP/WAMP).
- לשים את כל התיקייה תחת `htdocs` (או תיקיית השרת המקבילה).
- לוודא שה־DB קיים, וה־credentials בתוך `exercise_report.php` תואמים.

---

## ℹ️ הערות קטנות
- כל כפתור/תפריט שלא מומש מסומן כ־**Not implemented** באמצעות tooltip (`data-tip`).
- המערכת היא UI לפרויקט לימודי: אין מערכת הרשאות אמיתית, והמידע במסכים הוא דמו.
