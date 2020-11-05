import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, Picker, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { TextInputMask } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';
import CheckBox from '@react-native-community/checkbox';


import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';
import { FlatList } from 'react-native-gesture-handler';

export default function CadastroUsuario() {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const navigation = useNavigation();

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [celularUsuario, setCelularUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [senhaUsuario2, setSenhaUsuario2] = useState('');
    const [senhaUsuarioUncrpt, setSenhaUsuarioUncrpt] = useState('');
    const [senhaUsuarioUncrpt2, setSenhaUsuarioUncrpt2] = useState('');
    const [visivel, setVisivel] = useState(false)
    const [modalText, setModalText] = useState('Faltaram algumas informações!');
    const [url, setUrl] = useState("https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png")
    const [erroMsg, setErroMsg] = useState('');
    const [erroVisivel, setErroVisivel] = useState('');
    const [borderColorRed1, setBorderColorRed1] = useState(style.formOk);
    const [borderColorRed2, setBorderColorRed2] = useState(style.formOk);
    const [borderColorRed3, setBorderColorRed3] = useState(style.formOk);
    const [borderColorRed4, setBorderColorRed4] = useState(style.formOk);
    const [termoModal, setTermoModal] = useState(false)
    const [termoLido, setTermoLido] = useState(false)

    function backHome() {
        navigation.replace('Login');
    }

    useEffect(() => { }, []);

    async function criptoSenha1(senha) {
        setSenhaUsuarioUncrpt(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUsuario(criptoSenha)
    }
    async function criptoSenha2(senha) {
        setSenhaUsuarioUncrpt2(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUsuario2(criptoSenha)
    }

    async function enviaNotificacao(convidId) {
        await api.post(`/notificacoesGeral/${convidId}`, {
            mensagem: `Seja bem vind@ ao Churrapp, nós estamos muito felizes com a sua chegada!`,
            negar: null,
            confirmar: "Legal"
        })
    }

    async function navigateToResumo() {

        if (nomeUsuario == '') {
            setBorderColorRed1(style.formNok)
        } else {
            setBorderColorRed1(style.formOk)
        }
        if (senhaUsuario == '') {
            setBorderColorRed2(style.formNok)
        } else {
            setBorderColorRed2(style.formOk)
        }
        if (senhaUsuario2 == '') {
            setBorderColorRed4(style.formNok)
        } else {
            setBorderColorRed4(style.formOk)
        }
        if (celularUsuario == '') {
            setBorderColorRed3(style.formNok)
        } else {
            setBorderColorRed3(style.formOk)
        }


        if (nomeUsuario == '' ||
            celularUsuario == '') {
            setModalText("Faltaram algumas informações!");
            return setVisivel(true)
        }
        if (senhaUsuarioUncrpt.length < 8) {
            setBorderColorRed2(style.formNok)
            setBorderColorRed4(style.formNok)
            setModalText("A senha deve ter no mínimo 8 caracteres!");
            return setVisivel(true)
        } else {
            if (senhaUsuarioUncrpt == senhaUsuarioUncrpt2) {
                setLoading(true)
                await api.post('/usuarios', {
                    nome: nomeUsuario,
                    sobrenome: 'sobrenome',
                    email: `${celularUsuario}@churrapp.com`,
                    cidade: "cidade",
                    uf: "uf",
                    idade: "02/01/1900",
                    fotoUrlU: url,
                    celular: celularUsuario,
                    cadastrado: true,
                    apelido: nomeUsuario,
                    senha: senhaUsuario,
                    pontoCarne_id: 0,
                    carnePreferida_id: 0,
                    quantidadeCome_id: 0,
                    bebidaPreferida_id: 0,
                    acompanhamentoPreferido_id: 0,
                    sobremesaPreferida_id: 0,
                }).then(async function (response) {
                    if (response.data.mensagem != undefined) {
                        setLoading(false)
                        setErroMsg(response.data.mensagem)
                        setErroVisivel(true)
                    } else {
                        USUARIOLOGADO = response.data.usuario[0]
                        await enviaNotificacao(USUARIOLOGADO.id)
                        setLoading(false)
                        navigation.replace('Tabs');
                    }
                })
            } else {
                setBorderColorRed2(style.formNok)
                setBorderColorRed4(style.formNok)
                setModalText("As senhas não são iguais!");
                return setVisivel(true)
            }
        }
    }
    return (
        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                    <Icon style={style.iconHeaderBtn} name="arrow-left" size={22} />
                </TouchableOpacity>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Cadastro</Text>
                </View>
            </View>

            <ScrollView style={style.scrollView}>
                <View style={style.formGroup}>
                    <Text style={style.textLabel}>Primeiro nome:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed1]}
                        onChangeText={text => setNomeUsuario(text)}
                        placeholder={'Nome'}
                    />
                    <Text style={style.textLabel}>Celular:</Text>
                    <TextInputMask
                        style={[style.inputStandard, borderColorRed3]}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        keyboardType={"phone-pad"}
                        placeholder={'(xx)xxxxx-xxxx'}
                        value={celularUsuario}
                        includeRawValueInChangeText={true}
                        onChangeText={(text, rawText) => setCelularUsuario(rawText)}
                    />
                    <Text style={style.textLabel}>Senha:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed2]}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        secureTextEntry={true}
                        onChangeText={text => criptoSenha1(text)}
                    />
                    <Text style={style.textLabel}>Confirmar senha:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed4]}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        secureTextEntry={true}
                        onChangeText={text => criptoSenha2(text)}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <CheckBox value={termoLido} onValueChange={(termoLido) => setTermoLido(termoLido)} />
                        <TouchableOpacity onPress={() => setTermoModal(!termoModal)}>
                            <Text style={{textDecorationLine: 'underline', color: 'maroon'}}>Aceito os Termos de Uso</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>{modalText}</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => setVisivel(false)}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={erroVisivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>{erroMsg}</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => setErroVisivel(false)}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={termoModal}
            >
                <View style={style.centeredView}>
                    <View style={style.modalTermoView}>
                        <Text style={style.modalTitle}>Termos de Uso</Text>
                        <ScrollView>
                            <Text style={style.modalTermoText}><Text style={{ fontWeight: 'bold' }}>1. O que é o CHURRAPP?{'\n'}</Text>
                    1.1. Serviços. o Churrapp é uma plataforma que oferece os seguites serviços: Interação entre clientes e fornecedores.{'\n'}
                    1.2. Suspensão. Nós nos reservamos o direito de suspender ou cancelar, a qualquer momento, o seu acesso à aplicação em caso de suspeita de fraude, obtenção de benefício ou vantagem de forma ilícita, ou pelo não cumprimento de quaisquer condições previstas nestes Termos de Uso, na Política e Privacidade ou na legislação aplicável. Nesses casos, não será devida qualquer indenização a você, e o Churrapp poderá promover a competente ação de regresso, se necessário, bem como tomar quaisquer outras medidas necessárias para perseguir e resguardar seus interesses.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}2. COMO ACESSO O CHURRAPP?{'\n'}</Text>
                    2.1. Acesso. Para acessar o Churrapp e utilizar suas funcionalidades é necessário efetuar um cadastro. Para cadastra-se, você nos forneceŕa informações pessoais, conforme descrito em nossa Política de Privacidade. Para saber mais sobre a privacidade de suas informações pessoais no Churrapp, acesse nossa Política de Privacidade.{'\n'}
                    2.2. Idade de Utilização. PAra utilizar o Churrapp, você deve ter pelo menos 18 (dezoito) anos. Caso você tenha idade inferior, você poderá utilizar o Churrapp desde que com a supervisão dos seus pais ou responsáveis legais e desde que eles tenham lido e concordado expressamente com estes Termos de Uso.{'\n'}
                    2.3. Titularidade. A partir do cadastro, você será titular de uma conta que somente poderá ser acessada por você. Caso o Churrapp detecte alguma conta feita a partir de informações falsas, por usuários que, por exemplo, não possuem a idade mínima permitida, essa conta será automaticamente deletada.{'\n'}
                    2.3. Titularidade. A partir do cadastro, você será titular de uma conta que somente poderá ser acessada por você. Caso o Churrapp detecte alguma conta feita a partir de informações falsas, por usuários que, por exemplo, não possuem a idade mínima permitida, essa conta será automaticamente deletada.{'\n'}
                    2.4. Atualização das Informações. Desde já, você se compromete a manter as suas informações pessoais atualizadas. Você também concorda que irá manter o seu login e senha seguros e fora do alcance de terceiros, e não permitirá que a sua conta no Churrapp seja usada por outras pessoas. Dessa forma, o usuário responsabiliza-se por todas as ações realizadas em sua conta.{'\n'}
                    2.3. Titularidade. A partir do cadastro, você será titular de uma conta que somente poderá ser acessada por você. Caso o Churrapp detecte alguma conta feita a partir de informações falsas, por usuários que, por exemplo, não possuem a idade mínima permitida, essa conta será automaticamente deletada.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}3. COMO SÃO FEITOS OS PAGAMENTOS NO CHURRAPP?{'\n'}</Text>
                    3.1. Meio de Pagamento. Os pagamentos efetuados no Churrapp deverão ser realizados dentro da aplicação, por meio de Cartão de crédito e PIX.{'\n'}
                    3.2. Preço Final. O preço pago por você é final e não reembolsável, a menos que diversamente determinado pelo Churrapp. O Churrapp reserva-se o direito de estabelecer, remover e/ou revisar o preço relativo a todos os serviços ou bens obtidos por meio do uso da aplicação a qualquer momento. Nunca alteraremos o valor da sua subscrição sem antes avisá-lo.{'\n'}
                    3.3. Recolhimento de Impostos. Se houver a incidência de qualquer imposto, o usuário será responsável por seu recolhimento. Em caso de eventual recolhimento por parte da aplicação, a mesma explicíta que repassará ao usuário no preço.{'\n'}
                    3.4. Confirmação. A confirmação do pagamento por meio da aplicação ocorrerá em até 2 (dois) dias úteis. O processamento das informações de pagamento e a confirmação do pagamento serão realizados por sistemas de terceiros (ex. instituição financeira ou admnistradora do cartão de crédito), sendo o aplicativo uma mera interface entre o cliente e esses sistemas.{'\n'}
                    3.5. Prazo Mínimo. Certos produtos ou promoções do Churrapp podem exigir um prazo mínimo de assinatura. É importante que o usuário esteja ciente de que, caso decida não utilizar mais tais produtos antes do prazo mínimo de assinatura, podem ser cobradas tarifas adicionais.{'\n'}
                    3.6. Código Promocional. Caso o Churrapp crie algum código promocional (por exemplo, cupom de desconto), este deve ser usado de forma legal para a finalidade e o público ou usuário específico a que se destina, seguindo todas as suas condições. O código promocional pode ser cancelado caso se verifique que foi transferido, vendido ou utilizado com erro, fraude, ilegalidade ou violação às condições do respectivo código.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}4. QUAIS SÃO OS DIREITOS DO CHURRAPP SOBRE A APLICAÇÃO?{'\n'}</Text>
                    4.1. Nossos Direitos. Todos os direitos relativos ao Churrapp e suas funcionalidades são de propriedade exclusiva do churrapp, inclusive no que diz respeito aos seus textos, imagens, layouts, software, códigos, bases de dados, gráficos, artigos, fotografias e demais conteúdos produzidos direta ou indiretamente pelo Churrapp ("Conteúdo do Churrapp"). O Conteudo do Churrapp é protegido pela lei de direitos autorais e de propriedade intelectual. É proibido usar, copiar, reproduzir, modificar, traduzir, publicar, transmitir, distribuir, executar, fazer o upload, exibir, licenciar, vender ou explorar e fazer engenharia reversa do Conteúdo do Churrapp, para qualquer finalidade, sem o consentimento prévio e expresso do Churrapp. Qualquer uso não autorizado do Conteúdo do Churrapp será considerado como violação dos direitos autorais e da propriedade intelectual do Churrapp.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}5. PROPRIEDADE INTELECTUAL SOBRE O SOFTWARE E OS MATERIAIS DISPONIBILIZADOS{'\n'}</Text>
                    5.1. Propriedade Intelecutal. Para nós do Churrapp, a qualidade dos materiais disponibilizados ao usuário é de suma importância. A criação deles é fruto de muito trabalho e dedicação de nossos desenvolvedores. Por isso, reafirmamos que o Churrapp garante que todos os direitos, título e interesse (incluindo, mas não apenas, os direitos autorais, marcários e outros de propriedade intelectual) sobre o serviço disponibilizado por nós permanecerão sob a titularidade do Churrapp.{'\n'}
                    5.2. Não-aquisição de Direitos. O usuário não adquirirá nenhum direito de propriedade sobre os serviços e conteúdos do Churrapp, exceto quando haja outorga expressa neste Termo de Uso.{'\n'}
                    5.3. Download de Conteúdo. É proibido que o usuário faça o download de nosso conteúdo com o intuito de armazená-lo em banco de dados para oferecer para terceiro que não seja o próprio usuário. Veda-se, também, que o conteúdo disponibilizado por nós seja usado para criar uma base de dados ou um serviço que possa concorrer de qualquer maneira com o nosso negócio.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}6. RECLAMAÇÕES SOBRE VIOLAÇÃO DE DIREITO AUTORAL{'\n'}</Text>
                    6.1. Infrigência de Direitos. Alegações de infrigência de direito autoral de qualquer conteúdo disponível no Churrapp devem ser encaminhadas por meio do e-mail contato.churrapp@gmail.com.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}7. RESPONSABILIDADES DO USUÁRIO E DO CHURRAPP{'\n'}</Text>
                    7.1. Responsabilidade pelo Uso. Você é exclusivamente responsável pelo uso do Churrapp e deverá respeitar as regras destes Termos de Uso, bem como a legislação aplicável ao Churrapp.{'\n'}
                    7.2. Responsabilidade por Eventuais Danos. o Churrapp, seu controlador, suas afiliadas, parceiras ou funcionários não serão, em hipótese algumas, responsabilizados por danos diretos ou indiretos que reseultem de, ou que tenham relação com o acesso, uso ou a incapacidade de acessar ou utilizar o Churrapp.{'\n'}
                    7.3. Não-Responsabilização. TENDO EM VISTA AS CARACTERÍSTICAS INERENTES AO AMBIENTE DA INTERNET, O CHURRAPP NÃO SE RESPONSABILIZA POR INTERRUPÇÕES OU SUSPENÕES DE CONEXÃO, TRANSMISSÕES DE COMPUTADOR INCOMPLETAS OU QUE FALHEM, BEM COMO POR FALHA TÉCNICA DE QUALQUER TIPO, INCLUINDO, MAS NÃO SE LIMITANDO, AO MAU FUNCIONAMENTO ELETRÔNICO DE QUAlQUER REDE, HARDWARE OU SOFTWARE. A INDISPONIBILIDADE DE ACESSO À INTERNET OU AO CHURRAPP, ASSIM COMO QUALQUER INFORMAÇÃO INCORRETA OU INCOMPLETA SOBRE O CHURRAPP E QUALQUER FALHA HUMANA, TÉCNICA OU DE QUALQUER OUTRO TIPO NO PROCESSAMENTO DAS INFORMAÇÕES DO CHURRAPP NÃO SERÃO CONSIDERADAS RESPONSABILIDADE DO CHURRAPP. O CHURRAPP SE EXIME DE QUALQUER RESPONSABILIDADE PROVENIENTE DE TAIS FATOS E/OU ATOS.{'\n'}
                    7.4. Perda de Lucros. Quando permitido por lei, o Churrapp que os fornecedores ou distribuidores não serão responsáveis por perda de lucros, perda de receita, perda de dados, perdas financeiras ou por danos indiretos, especiais, consequenciais, exemplares ou punitivos.{'\n'}
                    7.5. Manutenção. É de sua inteira responsabilidade manter o ambiente de seu dispositivo (computador, celular, tablet, entre outros) seguro, com o uso de ferramentas disponíveis, como antivírus, firewall, entre outras, de modo a contribuir na prevenção de riscos eletrônicos.{'\n'}
                    7.6. Links Externos. É possível que o Churrapp possa conter links para sites e aplicativos de terceiros, assim como ter tecnologias integradas. Isso não implica, de maneira alguma, que o Churrapp endossa, verifica, garante ou possuí qualquer ligação com os proprietários desses sites ou aplicativos, não sendo responsável pelo seu conteúdo, precisão, políticas, práticas ou opiniões. O Churrapp recomenda que você leia os termos de uso e políticas de privacidade de cada site de terceiros ou serviço que o usuário vier a visitar ou utilizar.{'\n'}
                    7.7. Exclusão de Responsabilidade. Quando o Churrapp facilita a interação de você com prestadores terceiros independetes, isso não significa que o Churrapp endossa, verifica, garante, possuí qualquer ligação ou recomenda esses terceiros. NESSAS SITUAÇÕES, o CHURRAPP ATUA COMO MERO FACILIDATOR DA TRANSAÇÃO ENTRE VOCÊ E TAIS TERCEIROS, DE MODO QUE O CHURRAPP NÃO É FORNECEDOR DE BENS OU SERVIÇOS, OS QUAIS SÃO PRESTADOS DIRETAMENTE POR TERCEIROS PRESTADORES INDEPENDENTES. O CHURRAPP NÃO SERÁ, EM HIPÓTESE ALGUMA, RESPONSÁVEL POR TAIS PRODUTOS OU SERVIÇOS DE TERCEIROS FORNECEDORES E REITERAMOS A NECESSIDADE DO USUÁRIO LER, ANALISAR E ACEITAR OS TERMOS DE USO DAS PLATAFORMAS QUE POSSAM TER ALGUMA INTERFACE CONOSCO.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}8. COMO O CHURRAPP LIDA COM O CONTEÚDO QUE VOCÊ E OUTROS USUÁRIOS PRODUZEM?{'\n'}</Text>
                    8.1. Criação de Conteúdo. O Churrapp poderá, a seu exclusivo critério, permitir que você ou qualquer outro usuário apresente, carregue, publique ou disponibilize, na aplicação, conteúdo ou informações de texto, imagem, áudio ou vídeo ("Conteúdo de Usuário").{'\n'}
                    8.2. Conteúdos Proibidos. É proibido qualquer Conteúdo de Usuário de caráter difamatório, calunioso, injurioso, violento, pornográfico, obsceno, ofensivo ou ilícito conforme apuração do Churrapp a seu critério exclusivo, inclusive informações de propriedade exclusiva pertencentes a outras pessoas ou empresas (ex. direito de auto, marcas), sem a expressa autorização do titular desses direitos, cuja violação não será de responsabilidade do Churrapp.{'\n'}
                    8.3. Titularidade do Conteúdo. Qualquer Conteúdo de Usuário fornecido por você permance de sua propriedade. Contudo, ao fornecê-lo para o Churrapp, você nos outorga uma licença em nível mundial, por prazo indeterminado, gratuita e transferível, e com direito a sublicenciar, usar, copiar, modificar, criar obras derivadas, distribuir, publicar, exibir esse Conteúdo de Usuário em todos os formatos e canais de distribuição possíveis, sem necessidade de novo aviso a você, e sem necessidade de qualquer pagamento, desde que isso esteja relacionado ao funcionamento da plataforma. Ademais, senhas e dados bancários são protegios por criptografia, o que significa que nós seremos "cegos" com relação a esse Conteúdo.{'\n'}
                    8.4. Exclusão do Conteúdo. O Churrapp poderá, mas não se obriga a, analisar, monitorar e remover Conteúdo de Usuário, a critério exclusivo do Churrapp, a qualquer momento e por qualquer motivo, sem nenhuma viso a você.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>{'\n'}9. O QUE MAIS EU PRECISO SABER SOBRE ESTES TERMOS DE USO?{'\n'}</Text>
                    9.1. Alterações. Para melhorar sua experiência, o Churrapp está sempre sento atualizado. Por esse motivo, estes Termos de Uso podem ser alterados, a qualquer tempo, a fim de refletir os ajustes realizados. No entando, sempre que ocorrer qualquer modificação, você será previamente informado pelo endereço de e-mail fornecido por você no momento do cadastro ou por um aviso em destaque na aplicação. Caso você não concorde com os novos Termos de Uso, você poderá rejeitá-los, mas, infelizmente, isso signifca que você não poderá mais ter acesso e fazer uso do Churrapp. Se de qualquer maniera você utilizar o Churrapp mesmo após a alteração destes Termos de Uso, isso significa que você concorda com todas as modificações.{'\n'}
                    9.2. Conflito entre Disposições. Em caso de conflito entre estes termos e os termos modificados, os termos posteriores prevalecerão com relação a esse conflito.{'\n'}
                    9.3. Lei e Foro. Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer dúvidas e situações não previstas nestes Termos de Uso serão primeiramente resolvidas pelo Churrapp e, caso persistam, deverão ser solucionadas pelo Foro da Comarca de Campinas, São Paulo, com exclusão de qualquer outro, por mais privilegiado que seja ou venha a ser.{'\n'}
                    9.4. Dúvidas. Caso você tenha alguma dúvida, comentário ou sugestão, por favor entre em contato conosco por meio do e-mail contato.churrapp@gmail.com.</Text>
                        </ScrollView>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => setTermoModal(false)}>
                                <Text style={style.textBtn}>Já Li!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={style.footer}>
                {termoLido
                    ? <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                        <Text style={style.textBtn}>Cadastrar</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity style={style.continueBtnDisabled} onPress={navigateToResumo} disabled>
                        <Text style={style.textBtn}>Cadastrar</Text>
                    </TouchableOpacity>
                }

            </View>
            {criarModal}
        </View >
    );
}