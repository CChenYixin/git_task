title: Git 基本原理和常用命令
tags:
- Git
---

## 摘要

介绍 Git 的基本原理以及一些常用的操作命令。

## Git基本原理

### Git文件改动提交的基本原理

Git 是一种分布式的版本控制工具。它的控制系统由两个部分组成:工作区（Working Directory） 和 版本库（Repository）。

![git控制系统](http://ww1.sinaimg.cn/mw690/75fcfef2ly1fhsxocsxz5j20cq06iaa8.jpg)

Git 的工作流程如上图所示，首先是我们日常的 **工作区**，它实际持有文件。其次是 **版本库**，即工作区隐藏文件`。git`，记录我们文件的变动和提交。在版本库中，最重要的内容是 **缓存区*(Index/stage)**，它就像一个缓存区域，用来临时保存你的文件变动。最后是 **HEAD**，它一般指向我们最后一次提交的结果。

也就是说。当我们往 Git 版本库中添加文件的时候，会分成两个部分来执行，首先用`git add`把文件添加到缓存区，然后再用`git commit`提交更改，即把缓存区的文件提交到当前的分支上去。

### Git版本控制的基本原理

Git会记录我们的每一次提交，这样我们对文件的改动就会像时间线一样被 Git 记录下来。而 **HEAD** 就指向这条时间线最后一次提交的结果。因此比如说我们要回退到上一个版本就可以用命令`git reset --hard HEAD^`，但如果我们要回退到某个版本，我们就必须要只要那个版本的版本号(commit id)， Git提供了命令`git log`来供我们查找历史纪录。

这样我们通过`git log`来查询我们需要回退的版本号，然后利用命令`git reset --hard 版本号`来回退到我们需要的版本。

### Git分支管理的基本原理

上面指出 **HEAD** 一般指向我们的最后次的结果。那么`HEAD`本身是什么呢?通俗的来说，`HEAD`是一个指针，一般来说指向分支的最顶端，也就是我们最后一次提交的结果，但实际上它可以指向任意一个节点， Git就是利用它来追踪位置。当我们初始化一个 Git 仓库时，默认指向我们的主分支`master`。假如我们创建新的分支时，我们就可以通过命令`git checkout 分支名`切换到新的分支，这时`HEAD`指向我们新建的分支，这时对工作区的修改和提交就是针对我们新建的这个分支了，而原来`master`不会变化。当我们在新建的分支上修改满意后，再切回到主分支，然后用命令`git merge`把刚刚修改的结果合并到主分支上。这样就完成了一次分支的操作。

## 常用 Git 命令

### 文件改动提交相关

```
# 添加指定文件或目录到缓存区
$ git add file/dir

# 添加加当前目录的所有文件到暂存区
$ git add 。

# 提交缓存区到仓库区
$ git commit -m "代码提交信息"

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 显示有变更的文件
$ git status

# 提交到远程的仓库
git push origin master

```

### 版本控制相关

```
# 显示当前分支的版本历史
$ git log
$ git log --pretty=oneline

# 显示暂存区和工作区的差异
$ git diff

# 显示当前分支的最近几次提交
$ git reflog

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard "版本号"


```

### 分支管理相关

```
# 列出所有本地分支
$ git branch

# 新建一个分支，并切换到该分支
$ git checkout -b "分支名"

# 切换到指定分支，并更新工作区
$ git checkout "分支名"

# 合并指定分支到当前分支
$ git merge "指定分支"

# 删除分支
$ git branch -d "分支名"

# 提交到远程的仓库
$ git push origin "分支名"

# 要更新你的本地仓库至最新改动
$ git pull

```

### 其他
```
# 显示当前的Git配置
$ git config --list
```

## 参考文章
[git - 简明指南](http://rogerdudler。github。io/git-guide/index。zh。html)
[常用 Git 命令清单](http://www。ruanyifeng。com/blog/2015/12/git-cheat-sheet。html)
[git教程 -廖雪峰](https://www。liaoxuefeng。com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
