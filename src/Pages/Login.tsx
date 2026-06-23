import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiSigfaz from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // o (e) no tsx pedi o tipo do evento para evitar erros de tipagem
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 

    try {
      //inicio da requisição para o backend usando a baseURL do apiSigfaz
      const response = await apiSigfaz.post<{
        token: string;
        usuario: string;
      }>("/auth/login", {email, senha: password,}); 

      console.log("Resposta backend:", response.data);

      // salva o token no localStorage para usar nas próximas requisições
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error) {
      console.error("Erro ao fazer login:", error);

      alert("Erro ao conectar com backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1dd05f] min-h-screen flex flex-col justify-center items-center">
      {/* FORM */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-white w-[90%] max-w-100 p-7.5 rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col items-center justify-center text-center mb-5">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Acesse sua Fazenda
          </h2>

          <span className="text-[14px] text-[#555]">
            Gestão integrada para produtores rurais
          </span>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">E-mail</label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@exemplo.com"
            className="w-full p-2.5 mt-1 mb-4 border border-[#ccc] rounded-[5px] outline-none focus:border-[#1dd05f]"
          />
        </div>

        {/* SENHA */}
        <div className="flex justify-between items-end">
          <label className="text-sm font-semibold text-gray-700">Senha</label>

          <span className="text-[12px] text-[#1dd05f] cursor-pointer hover:underline">
            Esqueci minha senha
          </span>
        </div>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="************"
          className="w-full p-2.5 mt-1 mb-4 border border-[#ccc] rounded-[5px] outline-none focus:border-[#1dd05f]"
        />

        {/* CHECKBOX */}
        <div className="text-[14px] flex items-center text-gray-700">
          <input type="checkbox" id="lembrar" className="mr-2 cursor-pointer" />

          <label htmlFor="lembrar" className="cursor-pointer select-none">
            Lembrar deste dispositivo
          </label>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1dd05f] hover:bg-[#15a94c] text-white p-2.5 w-full text-[16px] rounded-[5px] mt-4"
        >
          {loading ? "Entrando..." : "Entrar no sistema"}
        </button>

        <hr className="w-full border-t border-[#eee] my-5" />

        <div className="text-center text-[13px] text-[#555]">
          Ainda não tem uma conta?{" "}
          <span className="text-[#1dd05f] font-semibold cursor-pointer hover:underline">
            Solicite Acesso
          </span>
        </div>
      </form>

      <div className="text-white mt-5 text-[12px] text-center">
        © 2026 SIGFaz - Sistema Integrado de Gestão Fazendária
      </div>
    </div>
  );
}

export default Login;
