import { Navbar } from "../Components/componentsSobreNos/Navbar";
import { InicialPage } from "../Components/componentsSobreNos/InicialPage";
import { ProblemaSolucao } from "../Components/componentsSobreNos/ProblemaSolucao";
import { Tecnologia } from "../Components/componentsSobreNos/Tecnologias";
import { Equipe } from "../Components/componentsSobreNos/Membros";
import { CTAIFMS } from "../Components/componentsSobreNos/Banner";
import { Footer } from "../Components/componentsSobreNos/Footer";



function SobreNos() {
  return (
    <div>
      {/*cada seção da pagina sobre nos é um componente diferente */}
      <Navbar />
      <InicialPage />
      <ProblemaSolucao />
      <Tecnologia />
      <Equipe />
      <CTAIFMS />
      <Footer />
    </div>
  );
}
export default SobreNos;
