<template>
  <section>
    <h1>{{ domain }}</h1>
    <h2>url shortener</h2>
    <div class="input">
      <input
        type="text"
        v-model="long"
        placeholder="https://github.com/mladenbrankovic"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'https://github.com/mladenbrankovic'"
        :class="{ invalid: !valid }"
      />
      <p v-if="error">{{ error }}</p>
    </div>
    <button @click="shorten">shorten</button>
    <div class="result" v-if="short">
      <p>url shortened to</p>
      <div class="url">
        <a id="short" :href="short" target="_blank">{{ short }}</a>
        <img v-if="!copied" src="../assets/img/copy.png" alt="copy" @click="copy" />
        <img v-else src="../assets/img/check.png" alt="copied" @click="copy" />
      </div>
    </div>
    <p class="links">
      <a :href="backendHost + '/api/docs'" target="_blank">api docs</a>
      ·
      <a
        href="https://github.com/mladenbrankovic/url-shortener"
        target="_blank"
        rel="noopener noreferrer"
        >github</a
      >
    </p>
  </section>
</template>

<script>
import { domain, backendHost } from '~/src/config';
import { default as axiosDefault } from 'axios';
import { isUri } from 'valid-url';

export default {
  name: 'UrlShortener',
  data() {
    return {
      domain: domain,
      backendHost: backendHost,
      axios: axiosDefault,
      long: '',
      short: '',
      error: '',
      valid: true,
      copied: false,
    };
  },
  methods: {
    async shorten() {
      this.error = '';
      this.short = '';
      this.valid = true;
      this.copied = false;

      if (!this.long) {
        this.error = 'error: no url entered';
        this.valid = false;
        return;
      }

      if (!isUri(this.long)) {
        this.error = 'error: url is malformed';
        this.valid = false;
        return;
      }

      const url = await this.axios.post(`${backendHost}/api/url`, { long: this.long });

      if (url.data.error) {
        this.error = 'something went wrong. please try again';
        this.valid = false;
        return;
      } else {
        this.short = url.data.short;
      }
    },
    copy() {
      const helper = document.createElement('textarea');
      helper.value = this.short;

      helper.style.top = '0';
      helper.style.left = '0';
      helper.style.position = 'fixed';

      document.body.appendChild(helper);
      helper.focus();
      helper.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        this.error('unable to copy: ' + err.message.toLowerCase());
      }

      document.body.removeChild(helper);

      this.copied = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@300;400&family=Ubuntu+Mono&display=swap');

section {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: 'Montserrat', 'Roboto', sans-serif;
  margin: 0 0 1rem 0;
  font-size: 2.5rem;

  @media (min-width: 450px) {
    font-size: 3rem;
  }

  @media (min-width: 600px) {
    font-size: 4rem;
  }
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  color: gray;

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
}

.input {
  margin: 5rem 0;
  width: 100%;
  min-width: 25%;
  max-width: 40rem;

  input {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    font-size: 1rem;
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
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
    animation: 1.5s pulse infinite;

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
      }

      40% {
        box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0);
      }

      70% {
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
    margin: 0;
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

.links {
  margin-top: 5rem;
  color: gray;

  a {
    color: gray;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
