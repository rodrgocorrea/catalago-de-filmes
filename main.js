document
  .querySelector("#registra-filme form")
  .addEventListener("submit", (e) => e.preventDefault());

const filmes = [];

document.getElementById("pesquisa-input").addEventListener("input", (e) => {
  filtarFilmes(e.target.value);
});

function registrarFilme() {
  const filme = pegaDadosInput();
  if (filmesRegistrados(filme.titulo))
    return alert("Já possui filme com esse titulo.");
  filmes.push(filme);
  alert("Filme cadastrado com sucesso!");

  limpaFormulario();
  listarFilmes(filmes);
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

// let imgAssistido = "/imagem/eye.svg"
// let imgNAssistido = "/imagem/eye-closed.svg"
// function btnClicado() {
//   document.getElementById("btn-assistido").src = imgNAssistido;
//   let img = imgNAssistido;
//   imgNAssistido = imgAssistido;
//   imgAssistido = img;

// }

// const botaoAssistido = document.getElementsByClassName[0]("botao-assistido");
// const botaoFavorito = document.getElementsByClassName[0]("botao-favorito");

// botaoAssistido.addEventListener("click", function () {
//   this.classList.toggle("assistido");
// });

// botaoFavorito.addEventListener("click", function () {
//   this.classList.toggle("favoritado");
// });

async function listarFilmes(filmes) {
  const arrayHTML = await Promise.all(
    filmes.map(
      async (filme) => `
   <div class="cartao">
          <div class="imagem-filme">
            <img src="${await pegarPoster(filme.titulo)}" />
          </div>
          <div class="detalhes-filme">
            <h3>${filme.titulo}</h3>
            <p class="nota">Nota: <span>${filme.nota}</span></p>
            <p class="duracao-filme">
              Duração: <span>${filme.duracaoFilme} min.</span>
            </p>
            <button class="botao-assistido" id="botao-assistido"></button>
            <button onclick="filmeFavoritado()" class="botao-favorito" id="botao-favorito"></button>
          </div>
        </div>
   `
    )
  );
  document.getElementById("conteiner-filmes").innerHTML = arrayHTML.join("");
}

function filtarFilmes(filtro) {
  console.log(filtro);
  const filmesFiltrados = filmes.filter((filme) =>
    filtro ? filme.titulo.toLowerCase().includes(filtro.toLowerCase()) : true
  );

  if (!filmesFiltrados.length)
    alert("Não foi encontrado nenhum filme com esse título");

  listarFilmes(filmesFiltrados.length ? filmesFiltrados : filmes);
}

async function pegarPoster(tituloFilme) {
  const url = "http://image.tmdb.org/t/p/w500";
  const imgPoster = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${tituloFilme}`
  );

  const json = await imgPoster.json();
  return json.results.length
    ? url + json.results[0].poster_path
    : "/imagem/no_image.jpg";
}


function filmeFavoritado() {
  const iconElement = document.getElementById("botao-favorito");
  const filmesFavoritos = filmes.filter((filme) => filme.favorito);
  if (filmesFavoritos.length >= 3) {
    alert("Já existem três filmes favoritos");
    return;
  }

  if (!filmesFavoritos.favorito) {
    filmesFavoritos.favorito = true;

    iconElement.classList.add("favoritado");
  } else {
    filmesFavoritos.favorito = false;

    iconElement.classList.remove("favoritado");
  }
};
console.log(filmes);
