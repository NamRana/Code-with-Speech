import React from 'react'
import Modal from '../Modal'
import { GlobalContext } from '../../../services/global-context'

interface ErrorPanelProps {
	show: boolean
	mainTitle: string
	title: string
	subTitle: string
	body: string | JSX.Element
	onShowDetails: () => void
	showDetails: boolean
}

export default function ErrorPanel(props: ErrorPanelProps) {
	if (!props.show) return null

    return (
		<React.Fragment>
			<div className="panel error" onClick={() => props.onShowDetails()} title="Click for more information">
				<div>{props.mainTitle}</div>
			</div>
			<Modal isOpen={props.showDetails}>
				<div className="modal-content lost-connection">
					<div className="wrapper">
						<div className="main-header">
							<h2>{props.title}</h2>
							<div>{props.subTitle}</div>
						</div>
						<div className="divider"></div>
						{typeof props.body === 'string' && (<div className="body" dangerouslySetInnerHTML={{ __html: props.body as string }} />)}
						{typeof props.body !== 'string' && (<div className="body">{props.body}</div>)}
					</div>
				</div>
			</Modal>
		</React.Fragment>
    )
}

export function LostConnectionError() {
	const context = React.useContext(GlobalContext)
	
	return (
		<ErrorPanel
			show={!(context.connectedToVSCode || context.mode === 'widget')}
			mainTitle={i18n(context.language)('no-connection-1')()}
			title={i18n(context.language)('no-connection-2')()}
			subTitle={i18n(context.language)('no-connection-sub')()}
			body={i18n(context.language)('no-connection-reason')()}
			showDetails={context.shadeIsOpen}
			onShowDetails={context.toggleShade}
		/>
	)
}

const SpokenLink = () => (
	<a
		rel="noreferrer"
		href="https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken-vscode-driver"
		target="_blank"
	>
		Spoken
	</a>
)

const texts: Record<string, Record<string, any>> = {
    'en-US': {
		'no-connection-1': () => 'Could not connect to Visual Studio Code!',
		'no-connection-2': () => "Couldn't connect to VSCode",
		'no-connection-sub': () => 'Speech2Code depends on a connection with Visual Studio Code',
		'no-connection-reason': () => (
			<React.Fragment>
				<div className="label">Could not connect to Visual Studio Code, possible reasons include:</div>
				<ul>
					<li>Visual Studio Code is not installed.</li>
					<li>
						<SpokenLink />, a required VSCode extension is not installed.
						Speech2Code tries to automatically install this extension.
					</li>
					<li>
						Visual Studio Code is not running. You first should open VSCode and then open
						this application (in that sequence!).
					</li>
				</ul>
			</React.Fragment>
		)
    },
    'pt-BR': {
		'no-connection-1': () => 'Erro ao conectar-se com o Visual Studio Code!',
		'no-connection-2': () => "Falha ao conectar-se com o VSCode",
		'no-connection-sub': () => 'Speech2Code depende de uma conex??o com o Visual Studio Code',
		'no-connection-reason': () => (
			<React.Fragment>
				<div className="label">Falha ao conectar-se com o Visual Studio Code, poss??veis raz??es incluem:</div>
				<ul>
					<li>Visual Studio Code n??o esta instalado.</li>
					<li>
						<SpokenLink />, uma extens??o do VSCode obrigat??ria para o uso
						desse programa n??o esta instalada. Speech2Code tenta instalar essa extens??o automaticamente.
					</li>
					<li>
						O Visual Studio Code n??o esta aberto. Voc?? deve primeiro abrir o VSCode e ent??o abrir
						este programa (nessa sequ??ncia!).
					</li>
				</ul>
			</React.Fragment>
		)
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId]