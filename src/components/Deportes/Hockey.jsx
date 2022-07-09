import CardSport from '../CardDeporte/CardSport';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer.jsx';
import NavBar from '../../navbar/navbar';
import './Hockey.css';

export default function Hockey() {
  return (
    <div>
      <NavBar />
      <div className="encabezadoH">
        <h1 className="h2">Hockey</h1>
      </div>
      <CardSport />
      <div className="inscibirse">
        <div className="title2">¿No estas registrado? </div>
        <div className="opciones">
          <div className="tres">
            <div className="dos">
              Te recordamos que para inscribirte en una actividad deportiva es
              requisito registrarte. Podes registrarte
              <Link to="/register"> AQUÍ</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
