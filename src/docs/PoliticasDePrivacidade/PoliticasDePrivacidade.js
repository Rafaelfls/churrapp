import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TermoDeUso from '../TermoDeUso/TermoDeUso.js'
import style from './styles.js'

const PoliticasDePrivacidade = () => {
    const [termo, setTermo] = useState(false)

    return (
        <View >
            {termo
                ? <TermoDeUso />
                : <View style={{height: '100%'}}>
                    {/* <View style={style.modalTermoView}> */}
                    <Text style={style.modalTitle}><Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Políticas de Privacidade</Text></Text>
                    <ScrollView>
                        <Text style={{ textAlign: 'justify' }}>
                            Churrapp construiu o aplicativo Churrapp como um aplicativo gratuito. Este SERVIÇO é fornecido pela Churrapp sem nenhum custo e deve ser usado como está.{'\n'}
              Esta página é usada para informar os visitantes sobre nossas políticas de coleta, uso e divulgação de Informações Pessoais, caso alguém decida usar nosso Serviço.{'\n'}
              Se você optar por usar nosso Serviço, você concorda com a coleta e uso de informações em relação a esta política. As informações pessoais que coletamos são usadas para fornecer e melhorar o serviço. Não usaremos ou compartilharemos suas informações com ninguém, exceto conforme descrito nesta <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Política de Privacidade</Text>.{'\n'}
              Os termos usados ​​nesta <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Política de Privacidade</Text> têm os mesmos significados que em nossos <Text onPress={() => { setTermo(true) }} style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text>, que podem ser acessados ​​no Churrapp, a menos que definido de outra forma nesta Política de Privacidade.{'\n'}
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Coleta e uso de informações</Text>
              Para uma melhor experiência, ao usar nosso Serviço, podemos exigir que você nos forneça certas informações de identificação pessoal, incluindo, mas não se limitando a Nome, Sobrenome, Email, Cidade, UF, Idade, Celular, Foto. As informações que solicitamos serão retidas por nós e usadas conforme descrito nesta <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Política de Privacidade</Text>.{'\n'}
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Dados de registro</Text>
              Queremos informar que sempre que você utiliza o nosso Serviço, em caso de erro no aplicativo, coletamos dados e informações (por meio de produtos de terceiros) no seu telefone chamados Log Data. Esses dados de registro podem incluir informações como endereço de protocolo de Internet ("IP") do dispositivo, nome do dispositivo, versão do sistema operacional, configuração do aplicativo ao utilizar nosso serviço, hora e data de uso do serviço e outras estatísticas .
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Cookies</Text>
              Cookies são arquivos com uma pequena quantidade de dados que são comumente usados ​​como identificadores exclusivos anônimos. Eles são enviados para o seu navegador a partir dos sites que você visita e são armazenados na memória interna do seu dispositivo.{'\n'}
              Este Serviço não usa esses “cookies” explicitamente. No entanto, o aplicativo pode usar código de terceiros e bibliotecas que usam “cookies” para coletar informações e melhorar seus serviços. Você tem a opção de aceitar ou recusar esses cookies e saber quando um cookie está sendo enviado para o seu dispositivo. Se você optar por recusar nossos cookies, pode não ser capaz de usar algumas partes deste Serviço.{'\n'}
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Provedores de serviço</Text>
            Podemos empregar empresas terceirizadas e indivíduos pelos seguintes motivos:
        </Text>
                        <FlatList
                            data={[
                                { key: 'Para facilitar nosso serviço;' },
                                { key: 'Para fornecer o Serviço em nosso nome;' },
                                { key: 'Para executar serviços relacionados com o serviço; ou' },
                                { key: 'Para nos ajudar a analisar como nosso Serviço é usado.' }
                            ]}
                            renderItem={({ item }) => <View><Text style={{ textAlign: 'justify' }}>{'\u2022'}{item.key}</Text></View>}
                        />
                        <Text style={{ textAlign: 'justify' }}>
                            Queremos informar aos usuários deste serviço que esses terceiros têm acesso às suas informações pessoais. O motivo é realizar as tarefas atribuídas a eles em nosso nome. No entanto, eles são obrigados a não divulgar ou usar as informações para qualquer outra finalidade.
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Segurança</Text>
            Valorizamos sua confiança em nos fornecer suas informações pessoais, portanto, estamos nos empenhando para usar meios comercialmente aceitáveis ​​de protegê-las. Mas lembre-se que nenhum método de transmissão pela internet, ou método de armazenamento eletrônico é 100% seguro e confiável, e não podemos garantir sua segurança absoluta.
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Links para outros site</Text>
            Este serviço pode conter links para outros sites. Se você clicar em um link de terceiros, você será direcionado a esse site. Observe que esses sites externos não são operados por nós. Portanto, recomendamos fortemente que você reveja a Política de Privacidade desses sites. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros.
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Privacidade das crianças</Text>
            Estes Serviços não se dirigem a ninguém com idade inferior a 13 anos. Não recolhemos intencionalmente informações de identificação pessoal de crianças com menos de 13 anos. No caso de descobrirmos que uma criança com menos de 13 anos nos forneceu informações pessoais, as eliminamos imediatamente dos nossos servidores. Se você é um pai ou responsável e está ciente de que seu filho nos forneceu informações pessoais, entre em contato para que possamos tomar as medidas necessárias.
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Mudanças nesta Política de Privacidade</Text>
            Podemos atualizar nossa Política de Privacidade de tempos em tempos. Portanto, recomendamos que você revise esta página periodicamente para verificar quaisquer alterações. Iremos notificá-lo de quaisquer alterações, publicando a nova Política de Privacidade nesta página.
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Esta política é válida a partir de 2020-11-06</Text>
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Contate-Nos</Text>
            Se você tiver alguma dúvida ou sugestão sobre nossa Política de Privacidade, não hesite em nos contatar em contato.churrapp@gmail.com.
        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>Créditos</Text>
            Esta página de política de privacidade foi criada em privacypolicytemplate.net e modificada / gerada pelo App Privacy Generator
        </Text>
                    </ScrollView>
                </View>
                // </View>
            }

        </View >
    );
}

export default PoliticasDePrivacidade;