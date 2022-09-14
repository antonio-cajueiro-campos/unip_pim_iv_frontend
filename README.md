# Top Seguros Brasil - Portal | 1.0.0
Frontend do projeto de PIM do quarto semestre da Universidade Paulista UNIP

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/antonio-cajueiro-campos/unip_pim_iv_backend)


## Tecnologias Empregadas
- Linguagem: TypeScript
- Framework: Ionic Angular 14
- CSS Preprocessor: SCSS

## Instalação

```sh
git clone https://github.com/antonio-cajueiro-campos/unip_pim_iv_frontend.git
cd unip_pim_iv_frontend
npm install
npm i -g @angular/cli
npm i -g @ionic/cli
ng serve
```

## Deploy
- Portal está sendo viabilizado pelo serviço de Host do Heroku
- Para poder acessar a versão de release acesse o [Heroku APP: top-seguros-brasil](https://top-seguros-brasil.herokuapp.com/)

## Conexão com o Back
- Para poder enviar requisições a API basta utilizar o link de deploy https://tsb-portal.herokuapp.com/
- Contará também com a documentação e consulta em tempo real da aplicação com o [Swagger da API](https://tsb-portal.herokuapp.com/swagger/index.html)

## Aplicação Android
```sh
// Atualize os resources (splash screen ou icone) do projeto.
capacitor-resources -p android

// Gerar os arquivos estáticos do projeto.
ionic build --configuration=production

// Atualize o subprojeto de android com o capacitor.
ionic capacitor build android --prod --release --no-open

// Gerar o APK
cd android

// Gerar Release
gradlew assembleRelease
```


## Desenvolvedores
<table>
	<tr>
    	<td align="center">
			<a href="https://github.com/antonio-cajueiro-campos">
				<img src="https://avatars.githubusercontent.com/u/7028783?v=4" width="100px;" alt=""/><br />
				<sub>
					<b>Antonio Carlos</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/antonio-cajueiro-campos/unip_pim_iv_frontend/commits?author=antonio-cajueiro-campos" title="Code">Commits: 💻</a>
		</td>
    <td align="center">
			<a href="https://github.com/Lucas4985">
				<img src="https://avatars.githubusercontent.com/u/102609797?v=4" width="100px;" alt=""/><br />
				<sub>
					<b>Lucas Fernandes</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/antonio-cajueiro-campos/unip_pim_iv_backend/commits?author=Lucas4985" title="Code">Commits: 💻</a>
		</td>
		<td align="center">
			<a href="https://github.com/RafaMatsu">
				<img src="https://avatars.githubusercontent.com/u/42724300?v=4" width="100px;" alt=""/><br />
				<sub>
					<b>Rafael Matsumoto</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/antonio-cajueiro-campos/unip_pim_iv_frontend/commits?author=RafaMatsu" title="Code">Commits: 💻</a>
		</td>
    	<td align="center">
			<a href="https://github.com/Dudu-Arsenal">
				<img src="https://avatars.githubusercontent.com/u/111618029?v=4" width="100px;" alt=""/><br />
				<sub>
					<b>Dudu Arsenal</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/antonio-cajueiro-campos/unip_pim_iv_frontend/commits?author=Dudu-Arsenal" title="Code">Commits: 💻</a>
		</td>
	</tr>
</table>
