import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function App() {

  const [cep, setCep] = useState('')
  const [show, setShow] = useState(false);
  const [showCep, setShowCep] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEndereco, setShowEndereco] = useState(false);
  const handleShowEndereco = () => setShowEndereco(true);
  const handleCloseEndereco = () => setShowEndereco(false);
  const handleShowCep = () => setShowCep (true);
  const handleCloseCep = () => setShowCep(false);
  const [dadosEndereco, setDadosEndereco] = useState([{}])
  const [dadosCep, setDadosCep] = useState([{}])

  async function buscaEndereco(evento) {
    evento.preventDefault()
    let url = `https://viacep.com.br/ws/${cep}/json/`
    await fetch(url).then((resposta) => resposta.json()).then(data => {

      setDadosEndereco([data]);
    })
    handleShowEndereco()
  }

  async function buscarCep(evento) {
    evento.preventDefault()
    let url = `https://viacep.com.br/ws/${formData.estado}/${formData.cidade}/${formData.logradouro}/json/`
    await fetch(url).then((resposta) => resposta.json()).then(data => {

      setDadosCep(data);
      console.log(data)
    })
    handleShowCep()
    
  }


  function pegarCep(evento) {
    const { value } = evento.target;

    setCep(value);
  }

  function criarDadosFormulario(evento) {
    const { name, value } = evento.target;

    setFormData({ ...formData, [name]: value });
  }

  const [formData, setFormData] = useState({
    estado: '',
    cidade: '',
    logradouro: '',
  });

  return (
    <>
      <Navbar bg="warning">
        <Navbar.Brand href="#inicio">FateCep</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="#inicio" onClick={handleShow} >Contato</Nav.Link>
        </Nav>
      </Navbar>
      <Jumbotron>
        <h1>FateCep</h1>
        <p>
          Consulte o CEP's de qualquer local do Brasil!<br></br>
      App desenvolvido em ReactJS e integrado com a API ViaCep.
    </p>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Informações de contato:</Modal.Title>
          </Modal.Header>
          <Modal.Body>Para ajuda e suporte:<br/><br/><p>Marcel Menezes Bezerra da Silva<br/>Telefone: (11) 93050-9534</p><p>E-mail: marcel.silva15@fatec.gov.br</p>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

        {/*Busca endereço pelo CEP */}

        <Form onSubmit={buscaEndereco}>

          
          <Form.Group>
            <Form.Label>Busca endereço pelo seu CEP:</Form.Label>
            <Form.Control onChange={pegarCep} required type="number" placeholder="Digite seu endereço" />
            <Form.Text className="text-muted">
              Digite seu CEP com 8 números (Sem pontuação ou traços).
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">Busca endereço</Button>
          <br></br>
          <br></br>
        </Form>

        <Modal show={showEndereco} onHide={handleCloseEndereco}>
          <Modal.Header closeButton>
            <Modal.Title>Informações do endereço:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              dadosEndereco.map(dados => (
                <>
                  <p>CEP: {dados.cep}</p>
                  <p>Logradouro: {dados.logradouro}</p>
                  <p>Bairro: {dados.bairro}</p>
                  <p>Cidade: {dados.localidade}</p>
                  <p>Estado: {dados.uf}</p>
                </>

              ))
            }

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

        {/*Busca CEP pelo endereço */}

        <Form onSubmit={buscarCep}>
          <Form.Group>
            <Form.Label>Busca CEP pelo seu endereço:</Form.Label>
            <Form.Control type="string" placeholder="Digite seu estado" name="estado" onChange={criarDadosFormulario}/>
            <Form.Text className="text-muted">
              Digite seu Estado abreviado (ex: SP para São Paulo, PR para Paraná).
            </Form.Text>
            <br></br>

            <Form.Control type="string" placeholder="Digite sua cidade"  name="cidade" onChange={criarDadosFormulario}/>
            <Form.Text className="text-muted">Digite a sua cidade (Sem pontuação ou traços).</Form.Text>
            <br></br>

            <Form.Control type="string" placeholder="Digite o logradouro" name="logradouro" onChange={criarDadosFormulario}/> <Form.Text className="text-muted">Digite o logradouro (Sem pontuação ou traços). </Form.Text>
            <br></br>
          </Form.Group>

          <Button variant="primary" type="submit">
            Busca cep
          </Button>
        </Form>

        <Modal show={showCep} onHide={handleCloseCep}>
          <Modal.Header closeButton>
            <Modal.Title>Informações do endereço:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              dadosCep.map(dados => (
                <>
                  <p>CEP: {dados.cep}</p>
                  <p>Logradouro: {dados.logradouro}</p>
                  <p>Bairro: {dados.bairro}</p>
                  <p>Cidade: {dados.localidade}</p>
                  <p>Estado: {dados.uf}</p>
                  <br/><hr/><br/>
                </>

              ))
            }

          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>

      </Jumbotron>
    </>
  )
}

export default App;