# NODE DOCKER MYSQL CONTAINER

## Start Containers

Run

```
sh run.sh
```

## Password Information

Look in the docker-compose.yml file to find all the mysql password info.  Because I am using mysql version 8 you have to use the mysql workbench and will not be able to use sqlpro.

## Debug VS Code

1. Go to the run_node.sh and change the file to text below.

```
npm run dev:debug
```

2. Run command below

```
sh run.sh
```

3. Open chrome://inspect

4. Under Remote Target click inspect

5. Attach debugger in vs code

6. Click on the debug icon

7. Click the play button and attached debugger