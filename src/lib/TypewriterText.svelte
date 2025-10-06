<script lang="ts">
    import Typewriter from 'svelte-typewriter';

    // 🔥 TIPADO: Definimos words como un array de strings (string[])
    export let words: string[] = []; 
    export let delay: number = 120;
    export let pause: number = 3500;
</script>

<Typewriter 
    mode="loop" 
    delay={delay} 
    pause={pause} 
    speed={delay}
    on:done
>
    {#each words as word}
        <div>{word}</div>
    {/each}
</Typewriter>