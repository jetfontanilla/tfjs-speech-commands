import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import githubLight from "./github-light.png";

const Header = () => (
	<header class={style.header}>
		<h1>TFJS Speech Commands Demo</h1>
		<a class="github" href="https://github.com/jetfontanilla/tfjs-offline-speech-commands">
			<img src={githubLight} width="32" height="32" alt="View on Github"/>
		</a>
	</header>
);

export default Header;
