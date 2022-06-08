import style from './style.css';
import githubDark from "./github-dark.png";

const Header = () => (
	<header class={style.header}>
		<h1>TFJS Speech Commands Demo</h1>
		<a class="github" href="https://github.com/jetfontanilla/tfjs-speech-commands">
			<img src={githubDark} width="32" height="32" alt="View on Github"/>
		</a>
	</header>
);

export default Header;
