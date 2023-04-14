<template>
  <div id="app">
    <input type="file" @change="openDocument" />
    <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
  </div>
</template>

<script>
import PSPDFKitContainer from "@/components/PSPDFKitContainer";

export default {
  data() {
    return {
      pdfFile: this.pdfFile || "/example.pdf",
    };
  },
  components: {
    PSPDFKitContainer,
  },
  methods: {
    handleLoaded(instance) {
      console.log("PSPDFKit has loaded: ", instance);
      // do something
    },
    openDocument() {
      if (this.pdfFile) {
        window.URL.revokeObjectURL(this.pdfFile);
      }
      this.pdfFile = window.URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
