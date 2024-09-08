# GIT常用指令

1. git stage实际上等价于git add。
2. 还原已暂存的文件的修改使用`git checkout xxx`， 需要注意的是如果你暂存的是添加的新文件，`git checkout`是不会删除该文件的。
3. `git commit`将暂存区的文件添加到history中，如果想要撤销已经执行了`git commit`的修改，可以使用`git reset xxx`，这样可以将该修改从暂存区中移出。
4. `git reset --mixed HEAD a.txt`,该命令的自然语言描述是： 不改变word dir中的任何数据，将stage区域中的a.txt还原成`commit history`中的样子，相当于把a.txtde修改从stage区撤销，但修改依然保存在work dir中，变为unstage的状态。
5. 直接将word dir中的修改提交到history区的快捷命令： `git commit -a`

6. `git checkout HEAD .`用于撤销本地的所有测试性的修改,需要注意的此命令不会将新增文件的修改删除。同样将HEAD换成commit的HASH值，你可以将任意文件或者整个项目恢复到历史版本。
7. 合并多个commit
```javascript
git commit 17bd20c
git add .
git commit -m 'balabala'
```
先使用git reset把HEAD移到某个提交记录，而且可以保证work dir中的数据是最新的提交，只要再add， commit，就相当于把中间的多个commit合并到一个了。

8. `git reflog`可以查看任何因为骚操作丢失的commit的HASH值。

9. `git rebase`: rebase 谁就是把最新的提交跟在谁屁股后面

`git rebase A`: 就是把HEAD指向的commit，跟在分支A的commit记录之后。


10.  git reset和git reset

* git revert 是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。
* 这两个操作，效果差不多，但是在日后继续merge以前的老版本时有区别。因为git revert是用一次逆向的commit中和之前的提交，因此日后合并老的branch时，导致这部分改变不再出现，但是git reset是直接把某些 commit 从branch上删除，因为和老的branch再次merge时，这些被回滚的commit应该还是会被引入。
* git reset是把head向后移动了一下，而git revert时head继续前进，只是新的commit的内容和自己想要回退到的那个commit的内容相同。