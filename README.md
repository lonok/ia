# Algorítimo Genético

## Com docker

```
// inicie a instância do docker

$ docker-compose down --remove-orphans
$ docker-compose build
$ docker-compose up -d
$ docker exec -it ia bash

// dentro do bash do container
root@:/app/src# http-server . --port 5555
```

## Sem docker

- Necessário nodejs 14 instalado (node --version)

```
$ cd src
$ npm install
$ http-server . --port 5555
```

## Visualização

No seu browser acesse: http://127.0.0.1:5555/

Defina os parametros do algorítimo e clique em **[ Iniciar Busca ]**

O algorítimo roda muito rápido para cada geração, para visualizar o que acontece de forma mais lenta lenta, diminua o FDP para 1