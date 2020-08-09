<template>
  <main>
    <h1>brnk.vc</h1>
    <h2>url shortener</h2>

    <div class="input">
      <input
        type="text"
        v-model="longUrl"
        placeholder="https://github.com/mladenbrankovic"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'https://github.com/mladenbrankovic'"
        :class="{ invalid: !urlValid }"
      />
      <p v-if="error">{{ error }}</p>
    </div>

    <button @click="shorten">shorten</button>

    <div class="result" v-if="shortUrl">
      <p>url shortened to</p>
      <div class="url">
        <a id="shortUrl" :href="shortUrl" target="_blank">{{ shortUrl }}</a>
        <img v-if="!copied" src="../assets/img/copy.png" alt="copy" @click="copy" />
        <img v-else src="../assets/img/check.png" alt="copied" @click="copy" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'UrlShortener',
  data() {
    return {
      axios: require('axios').default,
      urlValidator: require('valid-url'),
      longUrl: '',
      shortUrl: '',
      error: '',
      urlValid: true,
      copied: false,
    };
  },
  methods: {
    async shorten() {
      this.error = '';
      this.shortUrl = '';
      this.urlValid = true;
      this.copied = false;

      if (!this.longUrl) {
        this.error = 'error: no url entered';
        this.urlValid = false;
        return;
      }

      if (!this.urlValidator.isUri(this.longUrl)) {
        this.error = 'error: url is malformed';
        this.urlValid = false;
        return;
      }

      // this.shortUrl = await this.axios.get('http://localhost:8081/api/test');
    },
    copy() {
      const helper = document.createElement('textarea');
      helper.value = this.shortUrl;

      helper.style.top = '0';
      helper.style.left = '0';
      helper.style.position = 'fixed';

      document.body.appendChild(helper);
      helper.focus();
      helper.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy', err);
      }

      document.body.removeChild(helper);

      this.copied = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@300;400&family=Ubuntu+Mono&display=swap');

main {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-size: 4rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5em;
  font-weight: 300;
  color: gray;
}

.input {
  margin: 5rem 0;
  width: calc(100% - 4rem);
  min-width: 25%;
  max-width: 40rem;

  input {
    width: 100%;
    padding: 0.5rem;
    font-family: 'Ubuntu Mono', monospace;
    border: 1px solid lightgray;
    border-radius: 0.3rem 1rem;
    text-align: center;

    &.invalid {
      border-color: red;
      color: darkred;
    }
  }

  p {
    margin-top: 1rem;
    color: darkred;
    text-align: center;
  }
}

button {
  padding: 0.5rem 2rem;
  background: black;
  color: white;
  border: none;
  border-radius: 0.3rem 1rem;

  &:hover {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
    animation: 2s pulse infinite;

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
      }

      30% {
        box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0);
      }

      50% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
  }
}

.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 5rem;
  padding: 1rem 2rem;
  border: 1px solid limegreen;
  background: rgba($color: limegreen, $alpha: 0.3);
  border-radius: 0.3rem 1rem;

  p,
  a {
    color: darkgreen;
    text-align: center;
  }

  .url {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    a {
      margin-right: 1rem;
    }

    img {
      height: 1.2rem;
      cursor: pointer;
    }
  }
}
</style>
