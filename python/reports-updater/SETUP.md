# 🚀 Quick Setup Guide

## Step 1: Install dependencies

```bash
cd python
pip install -r requirements.txt
```

## Step 2: Configure credentials

Create a `.env` file in the `python/` directory:

```bash
SNOMED_USER=your_email@example.com
SNOMED_PASSWORD=your_password
```

💡 **Get your credentials**: https://mlds.ihtsdotools.org/

📌 **Important note**: 
- The syndication feed is **public** (no authentication required)
- Credentials are only used to **download ZIP files**

## Step 3: Test connection

```bash
python3 test_connection.py
```

✅ If you see the "SUCCESS" message, you're ready to go!

## Step 4: Generate complete reports

```bash
python3 run-reports.py
```

This process may take **15-30 minutes** depending on your connection:
- ⏬ Download: ~570 MB
- 📦 Extraction: thousands of files
- 📊 Analysis: processing millions of concepts

## 📂 Generated files

Reports are saved to two locations:

**Excel files** (local, not committed to Git):
```
python/output/
├── detect-inactivations.xlsx
├── fsn-changes.xlsx
└── list-new-concepts.xlsx
```

**HTML files** (for web, committed to Git):
```
frontend/src/assets/reports/
├── detect_inactivations_by_reason.html
├── fsn_changes_with_details.html
└── new_concepts_by_semantic_tag.html
```

## 🤖 Automation (optional)

### GitHub Actions Setup:

The workflow uses a GitHub Environment named **`reports-updates`**.

**If you already created the environment with secrets**: ✅ You're all set!

**To verify**:
1. Go to **Settings** → **Environments** → **reports-updates**
2. Confirm these secrets exist:
   - `SNOMED_USER`
   - `SNOMED_PASSWORD`

### Execution Options:

**Automatic (monthly):**
- Runs on the 2nd of each month at 3 AM UTC
- No action needed once environment is configured

**Manual (anytime):**
1. Go to **Actions** tab
2. Select **"Generate SNOMED Reports"**
3. Click **"Run workflow"** button
4. Confirm by clicking green **"Run workflow"**

📖 **Full guide**: See [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) for detailed instructions

## ❓ Common problems

### Error: "cannot import name 'download_latest_international'"

```bash
# Verify syntax
python3 -m py_compile syndication_downloader.py
```

### Error: "SNOMED_USER and SNOMED_PASSWORD must be set"

Make sure you have the `.env` file in `python/.env` (not in the root)

### Error: "No International Edition found"

- ✅ Verify your credentials at https://mlds.ihtsdotools.org/
- ✅ Ensure you have access to the International Edition
- ✅ Check your internet connection

### Error: 401 when downloading ZIP file

This means your credentials work for logging in, but not for downloading files.

**Common causes:**
- Account doesn't have download permissions
- Account needs "Member" or "Affiliate" status
- Account hasn't accepted required licenses/agreements

**How to fix:**
1. Log in to https://mlds.ihtsdotools.org/
2. Try to download a file manually
3. If it asks you to accept terms or upgrade account, do so
4. Try the script again

**Note:** The syndication feed (list of releases) is public, but downloading actual files requires proper MLDS membership with download rights.

### Reports take a long time

It's normal! The complete process includes:
- Download: 5-15 min
- Extraction: 3-5 min
- Analysis: 10-15 min

## 📖 More information

See [README.md](README.md) for complete documentation.
