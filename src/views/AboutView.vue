<template>
  <div class="about">
    <h1>About Our Library</h1>
    <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style>
</style>


<style scoped>
.about{
  max-width: 880px;
  margin: 56px auto;
  padding: 32px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.06);
  text-align: center;
}

.about h1{
  font-weight: 800;
  font-size: 2rem;
  letter-spacing: .2px;
  margin-bottom: .75rem;
}

.about p{
  color: #6b7280;           
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0 auto;
  max-width: 60ch;          
}


:host, :root, body{
  background: #f7f9fc;       
}


@media (max-width: 768px){
  .about{
    margin: 32px 16px;
    padding: 22px;
  }
  .about h1{ font-size: 1.6rem; }
  .about p{ font-size: 1rem; }
}
</style>
