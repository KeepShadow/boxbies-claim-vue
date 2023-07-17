<template>
    <div class="countDown" ><!-- v-if="displayCountDown" -->
        <!-- <h2 class="text-animation" v-if="isLive">Is now possible to claim</h2> -->
        <div><!-- v-else -->
            <h2 class="cdTitle">Next claim in:</h2>
            <section>
                <section class="timer">
                    <div>
                        <section>
                            <p>{{ days }}</p>
                            <p>
                                <small>Days</small>
                            </p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{{ hours }}</p>
                            <p>
                                <small>Hrs</small>
                            </p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{{ minutes }}</p>
                            <p>
                                <small>Min</small>
                            </p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{{ seconds }}</p>
                            <p>
                                <small>Sec</small>
                            </p>
                        </section>
                    </div>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CountDownTimer',
  created () {
    this.startTimer()
  },
  data () {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLive: false,
      displayCountDown: false
    }
  },
  methods: {
    startTimer () {
      const countdownDate = new Date('July 17, 2023 15:00:00').getTime()
      const interval = setInterval(() => {
        const now = new Date()
        const nowUTC = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        ).getTime()
        const distance = countdownDate - nowUTC
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        if (distance <= 0) {
          this.isLive = true
          clearInterval(interval)
        } else {
          this.days = days
          this.hours = hours
          this.minutes = minutes
          this.seconds = seconds
        }
        this.displayCountDown = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
    .timer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cdTitle{
        font-family: "Press Start 2P";
        color: white;
        text-align: center;
        font-size: 1.2em;
    }
    .timer div:first-child {
        border: 10px solid white;
        border-radius: 3px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        margin-bottom: 1em;
        padding: 1em 1em 0 1em;
        font-family: 'Press Start 2P', serif;
        font-size: 1.2em;
        color: white;
    }

    section p:first-child,
    .timer div:last-child span {
        display: contents;
    }

    @media screen and (max-width: 480px) {
        .timer div:last-child {
            margin-left: 2em;
            margin-right: 2em;
        }
    }
</style>
