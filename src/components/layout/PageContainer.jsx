import Navbar from './Navbar'
import Footer from './Footer'

function PageContainer({ children }) {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PageContainer
