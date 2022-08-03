- [Tab-Tag](#tab-tag)
- [作品描述：](#作品描述)
- [Tab-Tag Logo图](#tab-tag-logo图)
- [Logo图设计意义阐述](#logo图设计意义阐述)
  - [标签页：](#标签页)
  - [共享云：](#共享云)
  - [Tab-Tag拓展名：拓展的名称。](#tab-tag拓展名拓展的名称)
- [问题分析](#问题分析)
- [产品设计](#产品设计)
- [基本通用功能](#基本通用功能)
  - [标签页tag管理](#标签页tag管理)
  - [一键收藏](#一键收藏)
  - [一键关闭](#一键关闭)
  - [一键分享](#一键分享)
  - [共享空间](#共享空间)
    - [使用场景](#使用场景)
    - [产品定位](#产品定位)
    - [核心功能](#核心功能)
- [拓展功能](#拓展功能)
  - [多个共享空间](#多个共享空间)
  - [历史记录查询](#历史记录查询)
  - [快捷键快速切换各类标签页](#快捷键快速切换各类标签页)
  - [图标库](#图标库)
  - [多级分类](#多级分类)
  - [一键思维导图模式](#一键思维导图模式)
  - [更多自定义](#更多自定义)
  - [日历和待办功能](#日历和待办功能)
# Tab-Tag

# 作品描述：
在使用Edge浏览器的时候，很多用户都喜欢打开很多窗口。在此场景下标签页就会挤在一起，每个标签页的tab就会特别小。在用户想要快速找到某个标签页，或者在不同标签页之间切换就会变得很麻烦。针对上述痛点，我们开发了Tab-Tag浏览器拓展，通过给标签页添加Tag的方式管理浏览器中已经打开的标签页，从而减轻标签页混乱现象，提高在此场景下网页浏览的效率。除标签页管理等基本功能外，Tab-Tag还推出了共享空间这一亮点功能，支持用户根据标签批量化选择网页上传到共享空间，同时还可查看共享空间内其他用户分享的网页内容。这顺应了后疫情时代的工作和学习的趋势，对现代化的协同办公也有着诸多益处。

# Tab-Tag Logo图
![logo图](./logo.png)
# Logo图设计意义阐述
logo主体为一个圆形，圆形中有三个元素。1. 标签页；2. 共享云；3. Tab-Tag拓展名。
## 标签页：
以三个大小不同的标签页为例围绕在共享云周围，代表着tab标签页可以在云端共享；同时，每个标签页上都有着不同颜色的圆圈，代表着tab标签页可以被添加上不同的tag，通过tag进行管理。
## 共享云：
蓝色的共享云代表着共享空间，被添加了tag的tab标签页可以通过共享空间共享给其他用户。
## Tab-Tag拓展名：拓展的名称。

# 问题分析
痛点：在使用Edge浏览器的时候，很多人都喜欢打开很多窗口，经常会遇到打开十几个，二十几个标签页甚至更多标签页的情况。在这种情况下标签页就会挤在一起，每个标签页的tab就会特别小，这样想要快速找到某个标签页，或者在不同标签页之间切换就变得很麻烦。

# 产品设计
解决方案：Tab-Tag插件，可以给tab（标签页）添加tag的方式管理在浏览器中已经打开的标签页，减轻标签页混乱现象，提高在此场景下网页浏览的效率。

# 基本通用功能
## 标签页tag管理
当用户在Edge浏览器每打开一个新的网站页签时，会自动弹出Tab-Tag logo图标，点击此图标会弹出一个页面，页面中有不同颜色的tag，可以通过点击对应的tag选项为打开的网页打上tag。已经打开的网页，可以通过浏览器右键菜单选择此拓展，在此拓展的二级页面中也有不同颜色的tag，可以通过点击对应的tag选项为打开的网页打上tag。在选择tag时，用户也可以选择自定义tag选项，根据自己的喜好在弹出的自定义tag页面自定义tag。一个tab页面可以添加多个tag。
为了使用户更好的体验到标签页tag管理的便捷效果，点击Tab-Tag logo图标，就会在浏览器右侧出现一个置顶页面，页面内是根据用户对tab的添加的tag信息整理好的分类视图，页面内的视图信息会实时更新，这样可以方便用户快速查找需要浏览的网页。用户可以通过点击视图中各个tag分类下的网页tab，实现网页的快速跳转。被添加多个tag的tab页，会同时出现在这多个tag的分类下。
添加tag预览图
![tag预览图](./预览图/01.png)
右侧置顶页面预览图
![置顶预览图](./预览图/02.png)
## 一键收藏
当用户想要收藏已经打开的一些网页时，在拓展的右侧置顶页面设置了一键收藏button，点击button，可以弹出已经存在的tag选项，用户可以选择一个或者多个tag，所有被添加了这些tag的tab标签页都会批量收藏到浏览器的收藏夹中。
一键收藏预览图
![一键收藏预览图](./预览图/03.png)
## 一键关闭
当Tab-Tag管理页面比较多时，用户想要批量关闭一些tab标签页时，在拓展的右侧置顶页面设置了一键关闭button，点击button，可以弹出已经存在的tag选项，用户可以选择一个或者多个tag，所有被添加了这些tag的tab标签页都会被关闭。
一键关闭预览图
![一键关闭预览图](./预览图/03.png)
## 一键分享
Tab-Tag还支持批量分享网页功能。当用户想要分享已经打开的一些网页时，在拓展的右侧置顶页面有一个一键分享button，点击button，可以弹出已经存在的tag选项，用户可以选择一个或者多个tag，所有被添加了这些tag的tab标签页的网页链接都会批量复制到剪切板，可以粘贴在通讯软件中分享给其他用户。
一键分享预览图
![一键分享预览图](./预览图/03.png)
## 共享空间
### 使用场景
在后疫情时代，居家办公，远程办公已成为常态。在我们的工作学习中，往往需要分享很多的资料。在使用Edge浏览器查阅资料，观看视频时，在想要分享给其他人时，就需要把网页链接复制下来，然后粘贴到各类通讯软件中。Tab-Tag基于上述场景提出改进：内部推出共享空间，使Tab-Tag不仅仅是对标签页的Tag管理，还实现在Edge浏览器中与他人分享你正在浏览的网页，简化分享的步骤，提高生产力。

### 产品定位
在Tab-Tag拓展内部推出共享空间，用户可以建立一个共享空间，支持账号登录，支持用户根据标签批量化选择网页上传到共享空间。

邀请别人下载Tab-Tag插件，注册账号后再通过邀请码邀请其他用户加入共享空间，还可查看共享空间内其他用户分享的网页内容，也支持空间内其他用户编辑网页内容。这顺应了后疫情时代的工作和学习的趋势，对现代化的协同办公也有着诸多益处。

### 核心功能
点击Tab-Tag图标，进入右侧置顶页面，置顶页面有两个平行页面，标签页tag管理和共享空间。

当用户想要分享已经打开的一些网页时，在标签页tag管理页面有一个一键分享到共享空间button，点击button，可以弹出已经存在的tag选项，用户可以选择一个或者多个tag，所有被添加了这些tag的tab标签页的网页链接都会批量分享到共享空间内。

从标签页tag管理切换到共享空间页面，共享空间页面内是根据用户对tab添加的tag信息整理好的分类视图，加入此共享空间的所有用户都可以编辑访问此空间内的所有网页内容。
共享空间预览图
![共享空间预览图](./预览图/04.png)
登录页面预览图
![登录页面预览图](./预览图/05.png)
# 拓展功能
## 多个共享空间
用户可以加入多个共享空间

## 历史记录查询
通过点击Tab-Tag插件主页的历史查询button，可以一键打开一周内打开过的某分类下的所有网页标签页，通过Tab-Tag插件查询不同分类下的历史网页，比浏览器历史记录更加直观清晰。

## 快捷键快速切换各类标签页
用户在使用鼠标操作时偶尔会出现点击页面出错或者卡顿的情况，Tab-Tag通过设置快捷键，快速在各分类的网页之间跳转切换（逐类别跳转），将给用户带来方便的体验。

## 图标库
Tab-Tag给每个分类标签的图标预设了图标库，内含非常多的网址及图标信息，用户可以不用绞尽脑汁去设计图标，当然也支持用户自定义或上传图标。

## 多级分类
在Tab-Tag中，用户不仅可以自定义标签，或根据系统划分好的标签对网页进行管理，还可以对同一标签下的网页进行多级分类管理，具体操作是对网页进行拖动合并来构建多级分类定义。

## 一键思维导图模式
Tab-Tag为了便于用户体验页面的直观简洁，针对多级分类下的页面可以通过一键思维导图button,来将多级页面转换成可视化的分类思维导图。

## 更多自定义
在Tab-Tag中，给打开的网页不仅可以添加标签，还可以添加描述和备注信息，用户可以随时记录一下浏览网页中获取的灵感，当鼠标放在分类标签下的网页上时，会实时显示用户对该网页的描述和备注。与此同时支持自定义图标，图标可以自己定制，大小可以调整、位置可调整，预设丰富图标库，轻松打造自己喜欢的风格。

## 日历和待办功能
Tab-Tag插件内部还支持一些小的模块：日历、待办事项。


