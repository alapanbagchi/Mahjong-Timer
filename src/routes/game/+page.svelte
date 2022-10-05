<script lang="ts">
	import { current, time } from '../../stores/time';
	type Player = 'east' | 'north' | 'south' | 'west';
	const intervals = {
		east: {},
		north: {},
		south: {},
		west: {}
	};
	let playersWhoHaveLost = 0;
	const playerOrder = ['east', 'north', 'west', 'south'];
	//Function to decrement the time of the current player by 1 second and after the standard time is over, decrement the bank time by 1 second using setInterval
	const decrementTime = () => {
		const interval = setInterval(() => {
			if ($time[$current].standard > 0) {
				$time[$current].standard--;
			} else if ($time[$current].bonus > 0) {
				$time[$current].bonus--;
			} else {
				playersWhoHaveLost++;
				nextPlayer();
			}
		}, 1000);
		//Store the interval in the intervals object for the current player
		intervals[$current] = interval;
	};
	const nextPlayer = () => {
		clearInterval(intervals[$current]);
		let i = playerOrder.indexOf($current);
		while (true) {
			i++;
			if (i >= playerOrder.length) {
				i = 0;
			}
			if ($time[playerOrder[i]].standard > 0 || $time[playerOrder[i]].bonus > 0) {
				$current = playerOrder[i];
				if (playersWhoHaveLost === 3) {
					//Clear all the intervals
					Object.values(intervals).forEach((interval) => {
						clearInterval(interval);
					});
					break;
				}
				decrementTime();
				break;
			}
		}
	};
</script>

<section>
	<div class="box">
		<div class="north player {$current === 'north' ? 'active' : ''}  ">
			<p class="japanese">北 (North)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Standard Time</p>
					<p class="time">{$time.north.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Bank Time</p>
					<p class="time">{$time.north.bonus}</p>
				</div>
			</div>
		</div>
		<div class="south player {$current === 'south' ? 'active' : ''} ">
			<p class="japanese">南 (South)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Standard Time</p>
					<p class="time">{$time.south.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Bank Time</p>
					<p class="time">{$time.south.bonus}</p>
				</div>
			</div>
		</div>
		<div class="east player {$current === 'east' ? 'active' : ''}">
			<p class="japanese">東 (East)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Standard Time</p>
					<p class="time">{$time.east.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Bank Time</p>
					<p class="time">{$time.east.bonus}</p>
				</div>
			</div>
		</div>
		<div class="west player {$current === 'west' ? 'active' : ''} ">
			<p class="japanese">西 (West)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Standard Time</p>
					<p class="time">{$time.west.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Bank Time</p>
					<p class="time">{$time.west.bonus}</p>
				</div>
			</div>
		</div>
	</div>
	<button on:click={nextPlayer}>Next</button>
</section>

<style>
	section {
		width: 100%;
		max-width: 1000px;
		height: 100vh;
		display: flex;
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 50px;
		margin: 0 auto;
	}
	.time {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 20px;
	}
	.time_title {
		font-size: 1.2rem;
		color: #1a74e2;
	}
	.player {
		width: 300px;
		height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		opacity: 0.5;
	}
	.japanese {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 10px;
	}
	.north {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.south {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.east {
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
	.west {
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #1a74e2;
		color: white;
		font-size: 1.2rem;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.active {
		opacity: 1;
	}
	.active .japanese {
		color: #1a74e2;
	}
	.loser {
		color: red;
	}
</style>
