# Configuração e instalação

### Desenvolvimento

- npm i
- npm start

# Regras

### Modelo de Retorno

cod:
0: 'erro',
1: 'sucesso',
404: 'item não encontrado',
102: 'Marketplace não ativo ou encontrado'
101: 'Nenhum produto encontrado na previa'

### Rotas

base: http://localhost:3000

/previa:
  body: {
    "idProduto": {"ID DO PRODUTO"}(int),
    "idMarketplace": {"ID DO MARKETPLACE"}(int)
  }

/monitoramento: 
  body: {
    "idMarketplace": {"ID DO MARKETPLACE"}(int),
    "urlProduto": {"URL DO PRODUTO"}(string),
    "idPs": {"ID DO PS"}(int)
  }

* 
  ID DO PRODUTO: Id do produto no marketplace indicado.
  ID DO MARKETPLACE: Id do marketplace na tabela PS_MARKETPLACE.
  ID DO PS: Id do PS na tabela PS_PRODUTO
