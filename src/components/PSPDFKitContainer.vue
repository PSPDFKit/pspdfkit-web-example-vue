<template>
  <div class="pdf-container"></div>
</template>

<script>
import PSPDFKit from "pspdfkit";

export default {
  props: {
    pdfFile: {
      type: String,
      required: true,
    },
  },
  watch: {
    pdfFile(val) {
      if (val) {
        this.loadPSPDFKit();
      }
    },
  },
  methods: {
    async loadPSPDFKit() {
      PSPDFKit.unload(".pdf-container");
      return PSPDFKit.load({
        // import the PDF File from properties
        document: this.pdfFile,
        container: ".pdf-container",
      });
    },
  },
  beforeDestroy() {
    PSPDFKit.unload(".pdf-container");
  },
  mounted() {
    this.loadPSPDFKit().then((instance) => {
      this.$emit("loaded", instance);
    });
  },
};
</script>
<style scoped>
.pdf-container {
  height: 100vh;
}
</style>
