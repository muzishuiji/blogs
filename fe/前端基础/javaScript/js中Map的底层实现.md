# js中Map的底层实现

js中的map可以按照元素的插入顺序进行遍历，它底层是用哈希表实现的。

一般情况下，哈希表是数组+链表的形式组成，这使得寻址、插入、删除都比较方便。在JDK 8开始，某链表达到阈值会将链表结构转换为红黑树结构。

## 一个优秀的哈希函数需要注意什么？

哈希函数的设计一般需要考虑以下内容：
  - 均匀分布：
    - 好的哈希函数会使得键在哈希表中的分布尽可能均匀，也就是说，任何小的改动（比如改动键的一个字符）都会产生一个完全不同的哈希值。这样就可以最大程度的减少哈希冲突，使得哈希表的性能更优；
    - 同时可以防止恶意代码通过构造函数碰撞出来破坏哈希表的性能；
  - 计算效率：哈希函数的计算过程应该尽可能高效，以便能在O(1)时间内完成键到索引的映射；
  - 不可逆性：哈希函数应该是单向的，即从哈希值无法还原到原始的输入数据。这是为了保护数据的安全性，防止敏感信息被恢复出来；
  - 可扩展性：哈希函数应该能够适应不同规模的数据集，无论是小型还是大型数据集，都能够保持比较好的性能；

## hashmap的set过程

hashmap的set过程为：
首先判断key是否为空，若不为空则计算key的hash值：

  - 根据hash值计算在数组中的索引位置；
  - 如果数组在该位置有值，则通过比较是否存在相同的hash值；
    - 若寻在则将新的value覆盖原来的value；
    - 不存在则将key-value保存在链头；
- 若数组在该处没有元素，则直接保存；

## hashmap的get为什么是O(1)

hashmap在寻址指定的key时，若key不为空，则会先计算key的hash值，然后根据hash值确定数组中的索引值。index = hash mod x，相关的value会直接存在index中，其中x一般会被设计为当前数组被开辟的空间长度。

这也是为什么hash值通常为素数（除了1和它本身之外没有其他因数的数），这样能够更好的把hash值均匀分布在整个hashmap中，减少冲突；

每次插入元素要判断hash值是否已经存在，如果存在且刚好位于链表尾部，则get最坏的情况可以达到O(n)，这种情况可以用红黑树代替链表结构，将查找的时间稳定在 O(logn)，但红黑树的副作用也恰恰体现在无论如何都会 O(logn)。

hashmap会通过设计尽量避免hash值的冲突，所以一般认为其操作的时间复杂度是O(1)。

## hashmap的扩容机制

hashmap一开始创建，原始数组的大小可以事先设定，后续会基于一个机制，进行动态扩容。

基于JDK的hashmap的设计，创建时默认初始容量为16（就是数组的长度），每一次扩容时，容量翻倍，扩容通常在填充因数达到一定阈值时进行。

填充因数：已存储元素/容量，JDK默认阈值为0.75，这是一个权衡了时间和空间成本的折中方案。

达到阈值并扩充时，原本数组中的元素会重新计算其在数组中的位置，并重新插入，在数据量较大时，存在一定性能上的挑战。

js中的规范和JDK不同，但没有相关的数据。默认的空间、填充因素等都是通过内部一个计算逻辑得到的。

## 大容量扩容的优化策略

1. 并发扩容：将扩容过程分解成更小的任务，并允许他们在可用的处理器上并发运行，每一次扩容操作都只对其中一个段进行，从而适度减少了单次扩容的计算量；
2. 分布扩容：并非一次性将所有的数据移动到新的位置，而是每次添加新元素时，将一部分已有元素移动到新的位置。这种方式可将扩容操作分散在其他操作中，从而避免一次性完成所有哈希操作带来的性能压力；
3. 预先扩容：如果能预估到数据较多，可以提前选取一个大的初始大小，避免在运行过程中频繁的扩容操作；
4. 选择合适的填充因数；

## 红黑树的出现时机与副作用

在JDK8中，当hashmap中元素的数量大于一定阈值（默认64）并且要插入的元素在链表中的位置大于TERRIFY_THRESHOLD（默认为8），会将链表转为红黑树，这样可以提高搜索速度。

红黑树是一种自平衡的二叉搜索树，它插入和删除节点通过一系列的旋转和重新着色来保持树的平衡。它得名于节点上的颜色标记，每个节点可以是红色或黑色。

红黑树的特性使得树的高度保持在较小的范围内，从而保证了插入、删除和查找操作的时间复杂度都是O(logn)，这在极端情况下相比链表反而更耗时。


