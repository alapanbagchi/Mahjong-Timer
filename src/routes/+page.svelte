<script lang="ts">
	import Input from '$lib/Input.svelte';
	import { bonusTime, standardTime } from '../stores/time';
	//Get the value of the input field
	const onChange = (e: any) => {
        //If the value is not a number and if it is a number less than 0 strip the last character
        if (isNaN(e.target.value) || e.target.value < 0) {
            e.target.value = e.target.value.slice(0, -1);
            return
        }
        if (e.target.name === 'standard') {
            $standardTime = parseInt(e.target.value);
        } else {
            $bonusTime = parseInt(e.target.value);
        }
    };
    $: console.log($standardTime, $bonusTime);
</script>

<section>
	<div class="pagetitle">
		<h1>Welcome to Mahjong!</h1>
	</div>
	<div class="inputs">
		<Input
			name="standard"
			{onChange}
			type="text"
			placeholder="Enter the standard time"
			label="Standard Time"
		/>
		<Input
			name="bonus"
			{onChange}
			type="text"
			placeholder="Enter the bank time"
			label="Reserved Time"
		/>
	</div>
	<button>Start the game</button>
</section>

<style>
	section {
		max-width: 1200px;
		margin: 0 auto;
	}
	.pagetitle {
		text-align: center;
		margin-top: 50px;
		font-size: 1.5rem;
	}
	.inputs {
		width: 100%;
		display: flex;
		margin-top: 25px;
		gap: 50px;
	}
	button {
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: #1a74e2;
		color: #fff;
		font-size: 1rem;
		margin-top: 25px;
		cursor: pointer;
		scale: 1;
		transform: translateY(0);
		transition: all 0.2s ease-in-out;
	}
	button:hover {
		transform: translateY(-1px);
		transition: all 0.2s ease-in-out;
	}
	button:active {
		scale: 0.98;
		transition: all 0.2s ease-in-out;
	}
</style>
