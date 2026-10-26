# Contributing to Arcanum

This guide explains how teammates should set up Git, work on branches,
commit changes, and open pull requests for **Arcanum**.

The examples use PowerShell in VS Code on Windows. Replace placeholder
values such as `<your-username>` and `<branch-name>` with your own
values.

## 1. One-Time Git Setup

### Clone your fork

``` powershell
git clone https://github.com/<your-username>/Arcanum.git
cd Arcanum
```

### Add the main repository as `upstream`

``` powershell
git remote add upstream https://github.com/Not-Animesh/Arcanum.git
git remote -v
```

-   `origin` should point to **your fork**.
-   `upstream` should point to the main repository,
    `Not-Animesh/Arcanum`.

If `upstream` already exists, do not add it again. Check it with
`git remote -v`.

### Configure your Git identity

Use the name and email associated with your GitHub account:

``` powershell
git config user.name "Your Name"
git config user.email "email-verified-on-github"
```

These commands configure the identity for this repository. Omit
`--global` if you want the setting to apply only here.

### Fetch the main repository and create your local `test` branch

``` powershell
git fetch upstream
git switch -c test --track upstream/test
```

If you already have a local `test` branch, use `git switch test`
instead.

## 2. Understand the Git Workflow

-   **Working folder:** the files you edit.
-   **Staging area:** the changes selected for your next commit with
    `git add`.
-   **Commit:** a saved snapshot on the branch you currently have
    checked out.
-   **Branch:** a separate line of work. Switching branches updates your
    working files to match that branch.
-   **`origin`:** your fork of Arcanum.
-   **`upstream`:** the main Arcanum repository. Teammates generally
    fetch from it and open pull requests to it.

### Recommended branch workflow

Use `test` as the shared integration branch. Create a separate branch
for each task, and open one pull request per task branch.

``` text
upstream/test
    └── m2/bkt-model
    └── m2/synthetic-data
    └── m3/assessment-ui
```

Keep task branches focused and independent. If one task depends on
another task's code, wait until the dependency is merged into `test`,
then update your branch.

## 3. Daily Workflow

### Start from the latest `test`

``` powershell
git switch test
git pull
```

Because the local `test` branch tracks `upstream/test`, `git pull`
retrieves updates from the main repository.

### Create a branch for a new task

``` powershell
git switch test
git pull
git switch -c m2/bkt-model
```

Use a descriptive branch name, such as:

-   `m2/bkt-model`
-   `m2/synthetic-data`
-   `m3/assessment-ui`
-   `fix/practice-filters`
-   `docs/contributing-guide`

### Bring the latest `test` changes into your task branch

``` powershell
git switch test
git pull
git switch m2/bkt-model
git merge test
```

This merges the latest local `test` branch into your task branch.

## 4. Check Your Branch and Changes

Run these commands frequently:

``` powershell
git status
git branch
git log --oneline --graph --all -15
git diff
git diff --staged
```

  ---------------------------------------------------------------------------
  Command                                 What it shows
  --------------------------------------- -----------------------------------
  `git status`                            Current branch and changed/staged
                                          files

  `git branch`                            Local branches; `*` marks the
                                          current branch

  `git log --oneline --graph --all -15`   Recent commit history across
                                          branches

  `git diff`                              Changes not yet staged

  `git diff --staged`                     Changes included in the next commit
  ---------------------------------------------------------------------------

## 5. Switching Branches and Saving Unfinished Work

Switch to another branch:

``` powershell
git switch m3/assessment-ui
```

Return to the previous branch:

``` powershell
git switch -
```

Return to the shared integration branch:

``` powershell
git switch test
```

Git may block a branch switch if your uncommitted changes would be
overwritten. Either commit the work or stash it.

### Option A: Commit a complete step

Commit your changes on the task branch when they form a useful, working
unit.

### Option B: Stash unfinished work

``` powershell
git stash push -m "wip: bkt tests"
git switch other-branch

# Do the other work.

git switch m2/bkt-model
git stash list
git stash pop
```

`git stash pop` reapplies the stashed changes and removes that stash
entry if it succeeds. If conflicts occur, resolve them before
continuing.

## 6. Working on Multiple Branches

Each commit belongs to the branch checked out when you create it. A
typical workflow might look like this:

### Task A: BKT model

``` powershell
git switch m2/bkt-model

# Edit and test the files.

git status
git add ml-service/src/arcanum_ml/bkt/model.py ml-service/tests/unit/test_bkt.py
git diff --staged
git commit -m "feat(bkt): add mastery update and prediction functions"
git push -u origin m2/bkt-model
```

For later pushes from that branch, use:

``` powershell
git push
```

### Task B: Synthetic data

``` powershell
git switch test
git pull
git switch -c m2/synthetic-data

# Edit and test the files.

git add ml-service/src/arcanum_ml/data/simulator.py
git diff --staged
git commit -m "feat(data): add synthetic learner simulator"
git push -u origin m2/synthetic-data
```

Return to the first branch when you need to continue it:

``` powershell
git switch m2/bkt-model
```

### Keep branches independent

-   Open one pull request per task branch.
-   Avoid mixing unrelated changes in one branch.
-   If branch B needs code from branch A, wait until A is merged into
    `test`; then update `test` and merge it into B.

## 7. Commit Message Convention

Use this format:

``` text
type(scope): short summary in the imperative
```

Keep the summary to **72 characters or fewer**, and do not end it with a
full stop.

  Type         Use for
  ------------ ------------------------------------------
  `feat`       New feature
  `fix`        Bug fix
  `docs`       Documentation only
  `refactor`   Code changes that do not change behavior
  `test`       Adding or fixing tests
  `style`      Formatting only
  `chore`      Tooling, dependencies, or configuration
  `ci`         GitHub Actions and pipelines
  `content`    Lessons, problems, and questions

Examples:

``` powershell
git commit -m "feat(practice): add problem workspace layout"
git commit -m "fix(auth): redirect to onboarding after first login"
git commit -m "content(dsa): add two-pointers lesson and 5 problems"
git commit -m "test(bkt): cover correct and incorrect update cases"
git commit -m "docs(readme): add setup steps"
```

### Commit guidelines

-   Make one logical change per commit.
-   Commit when a useful step works.
-   Review `git diff --staged` before committing.
-   When you have changed many files, stage specific paths instead of
    automatically using `git add .`.

For a longer explanation, use a commit body:

``` powershell
git commit -m "fix(submit): hide hidden tests from the response" -m "The route returned expected output for hidden cases. It now returns only the verdict and counts."
```

## 8. Open a Pull Request

1.  Push your branch:

    ``` powershell
    git push -u origin <branch-name>
    ```

2.  Open your fork on GitHub and select **Compare & pull request**.

3.  Set the **base repository** to `Not-Animesh/Arcanum`.

4.  Set the **base branch** to `test`. Your fork branch should be the
    compare/head branch.

5.  Use a clear title, preferably following the commit message
    convention.

6.  In the description, explain:

    -   What changed.
    -   Why it changed.
    -   How to test it.
    -   Which checks you ran and their actual results.
    -   Screenshots for UI changes, when useful.

7.  Keep the pull request focused and reasonably small.

8.  If the reviewer requests changes, make them on the same branch,
    commit them, and push again.

### After the pull request is merged

Update your local `test` branch:

``` powershell
git switch test
git pull
```

Delete the local task branch when you no longer need it:

``` powershell
git branch -d m2/bkt-model
```

Delete the branch from your fork only if you want to remove it there as
well:

``` powershell
git push origin --delete m2/bkt-model
```

## 9. Updating a Branch When `upstream/test` Has Changed

Fetch the latest main-repository updates:

``` powershell
git fetch upstream
git switch m2/bkt-model
git merge upstream/test
```

Resolve any conflicts before continuing.

### Resolve a merge conflict

1.  Open each conflicted file in VS Code.

2.  Review the sections marked by `<<<<<<<`, `=======`, and `>>>>>>>`.

3.  Choose the correct changes or combine them.

4.  Remove the conflict markers and save the files.

5.  Stage the resolved files and commit the merge:

    ``` powershell
    git add <fixed-file>
    git commit
    ```

If you want to cancel a merge that is still in progress:

``` powershell
git merge --abort
```

## 10. Fixing Common Mistakes

  ---------------------------------------------------------------------------------
  Situation                           Command or action
  ----------------------------------- ---------------------------------------------
  Discard edits in one file           `git restore <file>`

  Unstage a file                      `git restore --staged <file>`

  Change the latest commit message    `git commit --amend -m "new message"`
  before pushing                      

  Add a forgotten file to the latest  `git add <file>` then
  commit before pushing               `git commit --amend --no-edit`

  Undo a commit that has already been `git revert <commit-hash>`
  pushed                              

  Started editing on `test` by        `git switch -c m2/my-task`
  mistake, but have not committed     

  Committed on `test` by mistake      Create a recovery branch before changing
                                      anything; see the warning below

  Restore an old version of a file    `git restore --source=<commit-hash> <file>`
  ---------------------------------------------------------------------------------

### Important warning about destructive commands

`git restore <file>` discards uncommitted changes to that file. Make
sure you do not need those changes first.

If you committed on `test` by mistake, preserve the commit before
correcting the branch:

``` powershell
git branch m2/my-task
```

Then inspect `git status` and `git log --oneline --decorate -5` before
deciding how to restore `test`. Do not blindly reset a shared branch.

**Never use `git push --force` or `git reset --hard` on work that has
been pushed or shared unless the repository maintainer has explicitly
coordinated the operation.** Avoid `git reset --hard` unless you fully
understand which commits and changes will be discarded.

## 11. Windows Notes

-   Messages such as `LF will be replaced by CRLF` are usually
    line-ending notices, not errors.
-   The repository uses `.gitattributes` with `* text=auto` to help keep
    line endings consistent.
-   Use the VS Code terminal from the project folder.
-   Check the current branch in the VS Code status bar before
    committing.
-   Never commit `.env` files, API keys, database credentials,
    `node_modules`, `.venv`, or large raw data files.

## 12. Ten-Command Cheat Sheet

  ----------------------------------------------------------------------------
  Command                                  Purpose
  ---------------------------------------- -----------------------------------
  `git status`                             Check the current branch and
                                           changes

  `git switch -c <branch>`                 Create and switch to a new branch

  `git switch <branch>`                    Switch branches

  `git switch -`                           Return to the previous branch

  `git add <files>`                        Stage selected files

  `git commit -m "type(scope): summary"`   Save a snapshot on the current
                                           branch

  `git push -u origin <branch>`            Push a new branch to your fork and
                                           set its upstream

  `git pull`                               Pull updates for the current branch

  `git stash push -m "message"` /          Park and restore unfinished work
  `git stash pop`                          

  `git log --oneline --graph --all`        Inspect commit history
  ----------------------------------------------------------------------------

------------------------------------------------------------------------

## Final reminders

-   Start each task from the latest `test` branch.
-   Create a dedicated branch for each task.
-   Keep commits focused and review staged changes.
-   Push your task branch to your fork.
-   Open a pull request against `Not-Animesh/Arcanum`, targeting `test`.
-   Never commit secrets or hidden test data.
-   Ask for review before merging changes into the shared branch.
