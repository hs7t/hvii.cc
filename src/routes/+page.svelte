<script lang="ts">
	import moment from 'moment';

	let birthDate = moment([2009, 7, 15]);
</script>

<section id="about-me" class="primary">
	<h1>Hello!</h1>
	<div class="paragraph-block">
		<p>
			You can call me Ali. I have been here on Earth for some
			{moment().diff(birthDate, 'days')} days (or
			{moment().diff(birthDate, 'years')} years). I was born to two wonderful parents in
			<a href="https://www.openstreetmap.org/relation/1320707">Cali, VAC, Colombia</a>, and
			currently live in a small town nearby.
		</p>
		<p>
			Making things makes me happy. Although I’m not particularly good at anything, I enjoy words,
			design, and fiddling with computers.
		</p>
	</div>
	<div class="paragraph-block">
		<p>
			You can find me...
		</p>
		<ul>
			<li><a href="https://github.com/hs7t">@hs7t</a> on GitHub</li>
			<li>@ali on the <a href="https://hackclub.com/">Hack Club</a> Slack</li>
			<li>
				<a href="https://www.instagram.com/alipuntocom/">@alipuntocom</a> on Instagram (I
				never really post anything there, though)
			</li>
			<li>
				on <a href="https://www.are.na/ali-sinisterra/">are.na</a>
			</li>
			<li>on this wonderful e-mail thing, at hello [at] hvii [dot] cc</li>
		</ul>
	</div>
</section>
