document
  .querySelector("#registra-filme form")
  .addEventListener("submit", (e) => e.preventDefault());

const filmes = [];

function registrarFilme() {
  const filme = pegaDadosInput();
  if (filmesRegistrados(filme.titulo))
    return alert("Já possui filme com esse titulo.");
  filmes.push(filme);
  alert("Filme cadastrado com sucesso!");

  limpaFormulario();
  listarFilmes();
}

function pegaDadosInput() {
  const titulo = document.getElementById("titulo-filme").value;
  const nota = document.getElementById("nota-filme").value;
  const duracaoFilme = document.getElementById("duracao-filme").value;

  return { titulo, nota, duracaoFilme, favorito: false, assistido: false };
}

function limpaFormulario() {
  document.getElementById("titulo-filme").value = "";
  document.getElementById("nota-filme").value = "";
  document.getElementById("duracao-filme").value = "";
}

function filmesRegistrados(titulo) {
  return filmes.find((filme) => filme.titulo === titulo);
}

function listarFilmes() {
  document.getElementById("conteiner-filmes").innerHTML = filmes
    .map(
      (filme) => `
   <div class="cartao">
          <div class="imagem-filme">
            <img src="/imagem/no_image.jpg" alt="Poster-filme" width="200px" />
          </div>
          <div class="detalhes-filme">
            <p>${filme.titulo}</p>
            <p class="nota">Nota: <span>${filme.nota}</span></p>
            <p class="duracao-filme">
              Duração: <span>${filme.duracaoFilme}</span>
            </p>
          </div>
        </div>
   `
    )
    .join("");
}
