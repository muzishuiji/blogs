## 依赖管理

### npm install命令的执行流程

1. 解析依赖树：根据package.json文件中的依赖项列表，递归检查每个依赖⚙️子依赖项的名称和版本要求，构建出依赖树并计算每一个依赖需要安装的确切版本。
2. 下载依赖项：构建出完整的依赖树后，npm会根据依赖项的名称和版本，下载相应的依赖包，下载过程会对依赖包做一些列安全检查，防止被篡改。
3. 安装依赖项：当依赖项下载完成后，npm将他们安装到项目的node_modules目录中。它会在该目录下创建一个与依赖项名称相同的文件夹，并将软件包的文件目录解压复制到相应的位置（不同包管理器最终产出的包结构不同）。
4. 解决依赖冲突：在安装依赖项的过程中，可能会出现依赖冲突，即不同依赖项对同一软件包的版本有不同的要求。npm会尝试解决这些冲突，通常采用版本回退或更新来满足所有依赖项的要求。
5. 更新package-lock.json：安装完成后，npm会更新项目目录下的package-lock.json文件。该文件记录了实际安装的软件包和版本信息，以及确切的依赖关系树，用于确保在后续安装过程中保持一致的依赖项状态（npm ci）。

### 依赖管理潜在的问题

1. semver不稳定
semver版本号迭代规则：Major.Minor.Patch 三段版本号，Major 代表较大范围的功能迭代，通常意味着破坏性更新；Minor 代表小版本迭代，可能带来若干新接口但“承诺”向后兼容；Patch 代表补丁版本，通常意味着没有明显的接口变化。

  - 部分npm包做则可能没有严格遵守semver定义的规则迭代版本号；
  - 很难保证补丁版本不带来破坏性改动；

推荐的方式：良好的依赖管理策略应该是在保证稳定的前提下，定期跟进依赖包的更新，小步快进将升级风险分摊到每一次的小版本迭代中。一个比较常见的策略是在开发环境使用时适当的范围版本，在测试&生产环境使用固定版本，以npm为例，开发环境使用范围版本，npm install安装依赖，在测试&生产环境使用npm ci命令。

npm install会尝试更新依赖，触发结构树变化并记录到package-lock.json文件，而npm ci则严格按照package-lock.json内容准确安装各个依赖版本，在ci/cd环境中能获得更强的稳定性，确保行为与开发环境尽可能一致。

### 依赖项类型

  - dependencies：生产依赖，指在软件包执行时必须的依赖项。这些依赖项是你的应用程序或模块的核心组成部分，当你部署到生产或测试环境时，这些依赖项都需要被安装消费。
  - devDependencies：开发依赖，仅在开发过程中需要使用的依赖项，通常包括测试框架、构建工具、代码检查器、TS类型库等。开发依赖项不需要在生产环境安装。
  - peerDependencies：对等依赖，用于指定当前package希望使用宿主环境提供的依赖，宿主环境无此依赖则安装；
  - optionalDependencies：可选依赖，当满足特定条件时可以选择性安装的依赖，且即使安装失败，安装命令也不会中断。可选依赖项通常用于提供额外的功能或优化，并不是必需的。
  optionalDependencies非常适合用作处理“平台”相关的依赖，除此之外还可以用于性能兜底、交互功能兜底等场景。
  - bundledDependencies：捆绑依赖，用于指定需要一同打包发布的依赖项，用的比较少；

**peerDependencies**

1. 若宿主提供了对等依赖声明（无论是Dependencies还是devDependencies），则优先使用宿主版本，若版本冲突则发出警告。

对等依赖冲突如何解决：
  - 1. 将所有对等依赖的版本统一为一个版本，可能需要升级或降级某些库（可能会引入兼容性问题）；
  - 2. 相关库将对等依赖的版本范围设置为兼容多个版本；
  - 3. 宿主项目使用Yarn的resolutions 或者使用npm8+的overrides来强制指定对等依赖的版本；

2. 若宿主未提供对等依赖，则尝试自动安装对应的版本依赖（NPM7.0之后支持）；

3. peerDependencies能帮我们实现，既要确保package能正常运行，又要避免给用户带来额外的依赖结构复杂性，在开发npm package，特别是一些框架插件，组件时可以多加使用，实践中会：

  - 使用peerDependencies声明webpack为对等依赖，要求宿主环境安装对应的依赖版本；
  - 同时使用devDependencies声明webpack开发依赖，确保开发过程中能正确安装必要的依赖项；

### 庞大的依赖包体系
1. 导致的一些问题

    - 需要计算依赖包之间的关系并下载大量依赖包，CPU 与 IO 占用都非常高，导致项目初始化与更新性能都比较差，我就曾经历过初始 yarn install 需要跑两个小时，加一个依赖需要跑半个小时的巨石项目。。。开发体验一言难尽；
    - 多个 Package 的依赖网络可能存在版本冲突，轻则导致重复安装，或重复打包，严重时可能导致 Package 执行逻辑与预期不符，引入一些非常难以定位的 bug，这个问题比较隐晦却重要，后面我们还会展开细讲；
    - 由于可能存在大量冲突，项目的依赖网络可能变得非常脆弱，某些边缘节点的微小变化可能触发依赖链条上层大量 Package 的版本发生变化，引起雪崩效应，进而影响软件最终执行效果，这同样可能引入一些隐晦的 bug；

2. 一些包依赖管理措施：

    1. 设定更严格的开源包审核规则：除了下载量、star数等指标外，需要大家仓库看看代码结构是否合理、是否有单测，单测覆盖率多少，是否能通过单测，issue持续时间，二级依赖包结构是否合理，确保其依赖的质量是稳定可靠的；
    2. 尽可能减少不必要的依赖：在引入三方库时，仔细审查其功能，看看是否真的需要使用这个库，是否自己实现（甚至copy）这些功能更快速、更简单，尽可能减少对第三方库的依赖；
    3. 分层依赖：如果项目较大（monorepo），可以将项目分层，每一层只能依赖相同层级或更基础的层级的库，这样可以降低各层之间的相互依赖，也有助于封层管理依赖结构，减少变动对上游的影响；
    4. 避免循环依赖：循环依赖不仅会急剧提升依赖网络的结构复杂度，还可能导致一些难以预料的问题，因此在做依赖结构审计时务必尽可能避免这类情况。

### 幽灵依赖

幽灵依赖是我们没有在package.json中注册声明某个依赖包，却能在代码中引用消费该package，出现这个问题，有两个原因引起的：
  - NodeJS的模块寻址逻辑；
  - 包管理器执行install命令后，安装下来的node_modules文件目录结构；

**嵌套依赖**    

```markdown
- A
  - B 
    - C 
- D
  - C
```
嵌套依赖的方案非常容易导致依赖结构深度过大，最终可能导致文件路径超过了一些系统的最大路径长度限制（主要是windows系统），导致崩溃。npm@3引入了优化策略：扁平化依赖结构。

**扁平化依赖**

扁平化依赖结构就是将所有的模块，无论是顶层依赖还是子依赖，都会写在项目顶层的node_modules中。
```markdown
- A
- B 
- C 
- D
```
这种目录结构看起来更简洁清晰，但根据NodeJS的寻址逻辑，意味着我们可以引用到任意其它npm包的子依赖，这种不明确的依赖关系是不稳定的，可能触发很多问题。

  - 不一致性：幽灵依赖可能导致应用程序的行为在不同的环境中表现不一致，因为不同环境中可能缺少或包含不同版本的幽灵依赖；
  - 不可预测性：本质上，幽灵依赖的是顶层依赖的依赖网络的一部分，你很难精细控制这些子孙依赖的版本；
  - 难以维护：如果你的代码中存在幽灵依赖，在依赖库升级或迁移时，幽灵依赖可能导致意外的兼容性问题或升级困难；

**如何解决幽灵依赖？**

1. 使用pnpm：与yarn、pnpm不同，pnpm不是简单的扁平化结构，而是使用符号链接将物理存储的依赖链接到项目的node_modules目录，确保每个项目只能访问在其package.json中明确声明的依赖。

2. 使用eslint：eslint提供了不少规则用于检测幽灵依赖，例如import/no-extraneous-dependencies，只需在项目中启用即可。

3. 使用depcheck：用于检测未使用或缺失的npm包依赖，可以协助发现现存代码可能存在的幽灵依赖，类似的还有npm-check等。

### 菱形依赖

依赖冲突通常出现在两个或多个包依赖不同版本的同一库时。设想这样一个场景：包app 依赖了lib-a，lib-b，而lib-a，lib-b又依赖了lib-d，此时这几个实体之间形成了一种菱形依赖关系。

菱形依赖本身时常见合理的依赖结构，但是当lib-a，lib-b依赖不同的lib-d版本时，会导致依赖冲突。

依赖冲突轻则导致重复安装，严重时可能导致构建失败、应用运行错误（例如bundle中同时存在两个react实例）等问题。其次，更大的隐患在于会使得的依赖网络的复杂度进一步恶化，降低项目的可维护性和可扩展性，长期难以维护。

依赖冲突通常发生在次级依赖中，我们通常无法细粒度的管控好这些底层依赖，只能采取一些手段缓解：
  - 打包构建时，借助webpack的alias之类的手段，强制指定版本包位置（类似于强制指定了版本号）；
  - 可以借助package.json的resolution字段强制绑定版本号；
  - 必要时，借助patch-package或pnpm patch对依赖包做微调；

### 循环依赖

循环依赖是指两个或多个package之间互相依赖，形成链式闭环的情况。这种循环结构可能很明显也可能很隐蔽。它使得依赖关系变得非常复杂，从有向无环图到有向有环图，这会增加依赖网络解析成本，包管理器通常需要为此编写复杂的循环依赖安装算法。

### 更新链路长

设想一个场景，存在依赖链条：A => B => C => D，若底层 D 包发布了一个新版本(比如修复了一个重要的安全问题)，那么有时候可能需要链条上的 B 与 C 包都随之更新版本之后，A 才能得到相应更新。

对开源包还好，会提供一些较强的容错性，而一些闭源的包则可能存在一些拙劣的兼容策略，设置直接锁死核心版本，从而导致顶层依赖难以得到更新。

### 一些最佳实践

1. 严格审查
引入三方依赖前，进行严格审查，例如：
  - 是否有完备详情的readme：表现了作者的用心程度和专业度，也决定了这个包的上手成本；
  - 更新频率：响应问题的时效性，作者在社区的活跃度；
  - 单测：代码稳定性和正确性是否能得到保证；
  - benchmark：源码中有一定比例的benchmark，则说明作者对性能有一定的要求；
  - 下载或star量：侧面证明了工具的稳定性和质量较好，但不可迷信指标；
  - 代码结构：观察代码的圈复杂度，如果有许多重复代码，则建议慎用；

2. 定期清理无用依赖

使用depcheck等工具定期清理无用依赖。

3. 定期review依赖结构图

大的MR的时候查看合并前后的依赖结构图，检查是否存在bad case

4. 使用pnpm

底层实现逻辑来说，更推荐使用pnpm，它安装下来的依赖结构更合理，能避开大多幽灵依赖问题，更重要的，它的缓存结构更合理，也因此有更好的安装、更新性能。