# 学校通[后端]

基于nestjs开发，主要功能是材料上传系统，这里是该系统的后台，实现了登录注册，用户管理，组权限管理，群员权限管理，材料审核等功能，项目目前查看文件则只能手动下载到本地查看，项目有用到邮箱注册，所以需要开通邮箱的smtp功能。

本项目有两种方式启动本项目，基于本地运行部署，以及基于**docker部署[推荐]**


## 本地运行部署

首先你需要安装postgres数据库，并为项目新建一个空数据库，如果你已经安装，请修改.env相关数据库配置

如果你有docker，可以通过docker-compose运行postgres容器，在项目根目录执行

```shell
docker compose -f "docker-compose.yml" up -d --build
```

项目需用pnpm作为包管理工具，执行以下指令安装pnpm

```shell
npm install pnpm -g
```

安装完pnpm，安装项目所需要的包

```shell
pnpm install
```

在运行前需要修改项目.env关于email的部分

```
# 如采用163邮箱则只需要填入以下内容，其他邮箱需要自行查询修改
EMAIL_ACCOUNT=
EMAIL_PASSWORD=
```

然后通过pnpm启动项目

```shell
pnpm run start:dev
```


## docker部署

前端项目打包将dist内容放在/Docker/nginx/html，这里我已经打包，[项目前端地址在这](https://github.com/Sav1ouR520/school-system-vue)

部署前需要修改项目根目录中.env关于email的部分，需要开通邮箱的smtp功能

```
# 如采用163邮箱则只需要填入以下内容，其他邮箱需要自行查询修改
EMAIL_ACCOUNT=
EMAIL_PASSWORD=
```

然后需要构建dockerfile，在项目下面有个backend.dockerfile，在项目根目录，然后执行该指令

```shel
docker build --pull --rm -f "backend.dockerfile" -t school-system-nest:latest "."
```

接下来通过docker-compose运行容器，在项目根目录，执行该指令，即可部署

```shell
docker compose -f "Docker\docker-compose.yml" up -d --build
```
