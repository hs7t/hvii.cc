<script lang="ts">
    import moment from "moment";

    let birthDate = moment([2009, 7, 15])
</script>

<section id="about-me">
    <h1>Hello!</h1>
    <div class="paragraph-block">
        <p>
            You can call me Ali. I have been here on Earth for some 
            {moment().diff(birthDate, "days")} days (or 
            {moment().diff(birthDate, "years")} years). I was born in Cali, 
            VAC, Colombia, and currently live in a small town nearby.
        </p>
        <p>
            Making things makes me happy. Although I’m not particularly good at 
            anything, I enjoy words, design, and fiddling with computers.
        </p>
        <p>
            Hack Club is cool. You should check it out!
        </p>
    </div>
</section>