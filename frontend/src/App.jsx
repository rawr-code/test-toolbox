import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

// Components
import FileList from './components/FileList.jsx'
import FileLinesTable from './components/FileLinesTable.jsx'

function App() {
  return (
    <main>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React Files App</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="main-content">
        <div className="left-content">
          <FileList />
        </div>
        <div className="right-content">
          <FileLinesTable />
        </div>
      </div>
    </main>
  )
}

export default App
