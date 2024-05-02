<template>
  <footer class="footer">
    <div class="container">
      <div class="social-media-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i class="pi pi-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i class="pi pi-linkedin"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <i class="pi pi-github"></i>
        </a>
      </div>
      <div class="copyright">
        © 2020 Copyright: ForHub
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  // Aqui você pode adicionar lógica ou dados para seu componente se necessário
};
</script>

<style scoped>
.container{
  padding-right: calc(var(--mdb-gutter-x)* 2.5) !important;
  padding-left: calc(var(--mdb-gutter-x)* 1.0) !important;
}

.footer {
  background-color: #343a40; /* Cor de fundo como na imagem */
  color: white;
  text-align: center;
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-media-icons {
  display: flex;
  align-items: center;
}

.social-media-icons a {
  margin: 0 5px;
}

.social-media-icons img {
  width: 24px;
  height: auto;
}

.copyright{
  font-family: "Poppins", sans-serif;
}


</style>
