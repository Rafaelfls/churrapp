import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PoliticasDePrivacidade from '../PoliticasDePrivacidade/PoliticasDePrivacidade.js';

import style from './styles.js'


const TermoDeUso = () => {
    const [politica, setPolitica] = useState(false);
    return (
        <View style={style.container}>
            {politica
                ? <PoliticasDePrivacidade />
                : <View style={{height: '100%'}}>
                    {/* <View style={style.modalTermoView}> */}
                    <Text style={style.modalTitle}><Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text></Text>
                    <ScrollView>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>1. O QUE É O CHURRAPP?</Text>{'\n'}
        1.1. Serviços. O Churrapp é uma plataforma que oferece os seguintes serviços: Interação entre clientes e fornecedores.{'\n'}
        1.2. Suspensão. Nós nos reservamos o direito de suspender ou cancelar, a qualquer momento, o seu acesso à aplicação em caso de suspeita de fraude, obtenção de benefício ou vantagem de forma ilícita, ou pelo não-cumprimento de quaisquer condições previstas nestes <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text>, na Política e Privacidade ou na legislação aplicável. Nesses casos, não será devida qualquer indenização a você, e o Churrapp poderá promover a competente ação de regresso, se necessário, bem como tomar quaisquer outras medidas necessárias para perseguir e resguardar seus interesses.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>2. COMO ACESSO O CHURRAPP?</Text>{'\n'}
        2.1. Acesso. Para acessar o Churrapp e utilizar suas funcionalidades é necessário efetuar um cadastro. Para cadastra-se, você nos forneceŕa informações pessoais, conforme descrito em nossa <Text onPress={() => { setPolitica(true) }} style={{ color: 'maroon', textDecorationLine: 'underline' }}>Políticas de Privacidade</Text>. Para saber mais sobre a privacidade de suas informações pessoais no Churrapp, acesse nossa <Text onPress={() => { setPolitica(true) }} style={{ color: 'maroon', textDecorationLine: 'underline' }}>Políticas de Privacidade</Text>.{'\n'}
        2.2. Idade de Utilização. Para utilizar o Churrapp, você deve ter pelo menos 18 (dezoito) anos. Caso você tenha idade inferior, você poderá utilizar o Churrapp desde que com a supervisão dos seus pais ou responsáveis legais e desde que eles tenham lido e concordado expressamente com estes <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text>.{'\n'}
        2.3. Titularidade. A partir do cadastro, você será titular de uma conta que somente poderá ser acessada por você. Caso o Churrapp detecte alguma conta feita a partir de informações falsas, por usuários que, por exemplo, não possuem a idade mínima permitida, essa conta será automaticamente deletada.{'\n'}
        2.4. Atualização das Informações. Desde já, você se compromete a manter as suas informações pessoais atualizadas. Você também concorda que irá manter o seu <Text style={{ fontStyle: 'italic' }}>login</Text> e senha seguros e fora do alcance de terceiros, e não permitirá que a sua conta no Churrapp seja usada por outras pessoas. Dessa forma, o usuário responsabiliza-se por todas as ações realizadas em sua conta.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>3. COMO SÃO FEITOS OS PAGAMENTOS NO CHURRAPP?</Text>{'\n'}
        3.1. Meio de Pagamento. Os pagamentos efetuados no Churrapp deverão ser realizados dentro da aplicação, por meio de Cartão de crédito e PIX.{'\n'}
        3.2. Preço Final. O preço pago por você é final e não reembolsável, a menos que diversamente determinado pelo Churrapp. O Churrapp reserva-se o direito de estabelecer, remover e/ou revisar o preço relativo a todos os serviços ou bens obtidos por meio do uso da aplicação a qualquer momento. Nunca alteraremos o valor da sua subscrição sem antes avisá-lo.{'\n'}
        3.3. Recolhimento de Impostos. Se houver a incidência de qualquer imposto, o usuário será responsável por seu recolhimento. Em caso de eventual recolhimento por parte da aplicação, a mesma explícita que repassará ao usuário no preço.{'\n'}
        3.4. Confirmação. A confirmação do pagamento por meio da aplicação ocorrerá em até 2 (dois) dias úteis. O processamento das informações de pagamento e a confirmação do pagamento serão realizados por sistemas de terceiros (ex. instituição financeira ou administradora do cartão de crédito), sendo o aplicativo uma mera interface entre o cliente e esses sistemas.{'\n'}
        3.5. Prazo Mínimo. Certos produtos ou promoções do Churrapp podem exigir um prazo mínimo de assinatura. É importante que o usuário esteja ciente de que, caso decida não utilizar mais tais produtos antes do prazo mínimo de assinatura, podem ser cobradas tarifas adicionais.{'\n'}
        3.6. Código Promocional. Caso o Churrapp crie algum código promocional (por exemplo, cupom de desconto), este deve ser usado de forma legal para a finalidade e o público ou usuário específico a que se destina, seguindo todas as suas condições. O código promocional pode ser cancelado caso se verifique que foi transferido, vendido ou utilizado com erro, fraude, ilegalidade ou violação às condições do respectivo código.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>4. QUAIS SÃO OS DIREITOS DO CHURRAPP SOBRE A APLICAÇÃO?</Text>{'\n'}
        4.1. Nossos Direitos. Todos os direitos relativos ao Churrapp e suas funcionalidades são de propriedade exclusiva do churrapp, inclusive no que diz respeito aos seus textos, imagens, layouts, software, códigos, bases de dados, gráficos, artigos, fotografias e demais conteúdos produzidos direta ou indiretamente pelo Churrapp ("Conteúdo do Churrapp"). O Conteúdo do Churrapp é protegido pela lei de direitos autorais e de propriedade intelectual. É proibido usar, copiar, reproduzir, modificar, traduzir, publicar, transmitir, distribuir, executar, fazer o upload, exibir, licenciar, vender ou explorar e fazer engenharia reversa do Conteúdo do Churrapp, para qualquer finalidade, sem o consentimento prévio e expresso do Churrapp. Qualquer uso não autorizado do Conteúdo do Churrapp será considerado como violação dos direitos autorais e da propriedade intelectual do Churrapp.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>5. PROPRIEDADE INTELECTUAL SOBRE O SOFTWARE E OS MATERIAIS DISPONIBILIZADOS</Text>{'\n'}
        5.1. Propriedade Intelectual. Para nós do Churrapp, a qualidade dos materiais disponibilizados ao usuário é de suma importância. A criação deles é fruto de muito trabalho e dedicação de nossos desenvolvedores. Por isso, reafirmamos que o Churrapp garante que todos os direitos, título e interesse (incluindo, mas não apenas, os direitos autorais, marcários e outros de propriedade intelectual) sobre o serviço disponibilizado por nós permanecerão sob a titularidade do Churrapp.{'\n'}
        5.2. Não aquisição de Direitos. O usuário não adquirirá nenhum direito de propriedade sobre os serviços e conteúdos do Churrapp, exceto quando haja outorga expressa neste Termos de Uso.{'\n'}
        5.3. <Text style={{ fontStyle: 'italic' }}>Download</Text> de Conteúdo. É proibido que o usuário faça o <Text style={{ fontStyle: 'italic' }}>download</Text> de nosso conteúdo com o intuito de armazená-lo em banco de dados para oferecer para terceiro que não seja o próprio usuário. Veda-se, também, que o conteúdo disponibilizado por nós seja usado para criar uma base de dados ou um serviço que possa concorrer de qualquer maneira com o nosso negócio.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>6. RECLAMAÇÕES SOBRE VIOLAÇÃO DE DIREITO AUTORAL</Text>{'\n'}
        6.1. Infringência de Direitos. Alegações de infringência de direito autoral de qualquer conteúdo disponível no Churrapp devem ser encaminhadas por meio do e-mail<Text style={{ color: 'maroon' }}> contato@churrapp.com</Text>.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>7. RESPONSABILIDADES DO USUÁRIO E DO CHURRAPP</Text>{'\n'}
        7.1. Responsabilidade pelo Uso. Você é exclusivamente responsável pelo uso do Churrapp e deverá respeitar as regras destes Termos de Uso, bem como a legislação aplicável ao Churrapp.{'\n'}
        7.2. Responsabilidade por Eventuais Danos. o Churrapp, seu controlador, suas afiliadas, parceiras ou funcionários não serão, em hipótese algumas, responsabilizados por danos diretos ou indiretos que resultem de, ou que tenham relação com o acesso, uso ou a incapacidade de acessar ou utilizar o Churrapp.{'\n'}
        7.3. Não-Responsabilização. <Text style={{ fontWeight: 'bold' }}>TENDO EM VISTA AS CARACTERÍSTICAS INERENTES AO AMBIENTE DA INTERNET, O CHURRAPP NÃO SE RESPONSABILIZA POR INTERRUPÇÕES OU SUSPENSÕES DE CONEXÃO, TRANSMISSÕES DE COMPUTADOR INCOMPLETAS OU QUE FALHEM, BEM COMO POR FALHA TÉCNICA DE QUALQUER TIPO, INCLUINDO, MAS NÃO SE LIMITANDO, AO MAU FUNCIONAMENTO ELETRÔNICO DE QUALQUER REDE, HARDWARE OU SOFTWARE. A INDISPONIBILIDADE DE ACESSO À INTERNET OU AO CHURRAPP, ASSIM COMO QUALQUER INFORMAÇÃO INCORRETA OU INCOMPLETA SOBRE O CHURRAPP E QUALQUER FALHA HUMANA, TÉCNICA OU DE QUALQUER OUTRO TIPO NO PROCESSAMENTO DAS INFORMAÇÕES DO CHURRAPP NÃO SERÃO CONSIDERADAS RESPONSABILIDADE DO CHURRAPP. O CHURRAPP SE EXIME DE QUALQUER RESPONSABILIDADE PROVENIENTE DE TAIS FATOS E/OU ATOS.</Text>{'\n'}
        7.4. Perda de Lucros. Quando permitido por lei, o Churrapp que os fornecedores ou distribuidores não serão responsáveis por perda de lucros, perda de receita, perda de dados, perdas financeiras ou por danos indiretos, especiais, consequenciais, exemplares ou punitivos.{'\n'}
        7.5. Manutenção. É de sua inteira responsabilidade manter o ambiente de seu dispositivo (computador, celular, tablet, entre outros) seguro, com o uso de ferramentas disponíveis, como antivírus, <Text style={{ fontStyle: 'italic' }}>firewall</Text>, entre outras, de modo a contribuir na prevenção de riscos eletrônicos.{'\n'}
        7.6. <Text style={{ fontStyle: 'italic' }}>Links</Text> Externos. É possível que o Churrapp possa conter <Text style={{ fontStyle: 'italic' }}>links</Text> para <Text style={{ fontStyle: 'italic' }}>sites</Text> e aplicativos de terceiros, assim como ter tecnologias integradas. Isso não implica, de maneira alguma, que o Churrapp endossa, verifica, garante ou possuí qualquer ligação com os proprietários desses <Text style={{ fontStyle: 'italic' }}>sites</Text> ou aplicativos, não sendo responsável pelo seu conteúdo, precisão, políticas, práticas ou opiniões. O Churrapp recomenda que você leia os <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text> e <Text onPress={() => { setPolitica(true) }} style={{ color: 'maroon', textDecorationLine: 'underline' }}>Políticas de Privacidade</Text> de cada <Text style={{ fontStyle: 'italic' }}>site</Text> de terceiros ou serviço que o usuário vier a visitar ou utilizar.{'\n'}
        7.7. Exclusão de Responsabilidade. Quando o Churrapp facilita a interação de você com prestadores terceiros independentes, isso não significa que o Churrapp endossa, verifica, garante, possuí qualquer ligação ou recomenda esses terceiros. <Text style={{ fontWeight: 'bold' }}>NESSAS SITUAÇÕES, o CHURRAPP ATUA COMO MERO FACILITADOR DA TRANSAÇÃO ENTRE VOCÊ E TAIS TERCEIROS, DE MODO QUE O CHURRAPP NÃO É FORNECEDOR DE BENS OU SERVIÇOS, OS QUAIS SÃO PRESTADOS DIRETAMENTE POR TERCEIROS PRESTADORES INDEPENDENTES. O CHURRAPP NÃO SERÁ, EM HIPÓTESE ALGUMA, RESPONSÁVEL POR TAIS PRODUTOS OU SERVIÇOS DE TERCEIROS FORNECEDORES E REITERAMOS A NECESSIDADE DO USUÁRIO LER, ANALISAR E ACEITAR OS <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>TERMOS DE USO</Text> DAS PLATAFORMAS QUE POSSAM TER ALGUMA INTERFACE CONOSCO.</Text>
                        </Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>8. COMO O CHURRAPP LIDA COM O CONTEÚDO QUE VOCÊ E OUTROS USUÁRIOS PRODUZEM?</Text>{'\n'}
        8.1. Criação de Conteúdo. O Churrapp poderá, a seu exclusivo critério, permitir que você ou qualquer outro usuário apresente, carregue, publique ou disponibilize, na aplicação, conteúdo ou informações de texto, imagem, áudio ou vídeo ("Conteúdo de Usuário").{'\n'}
        8.2. Conteúdos Proibidos. É proibido qualquer Conteúdo de Usuário de caráter difamatório, calunioso, injurioso, violento, pornográfico, obsceno, ofensivo ou ilícito conforme apuração do Churrapp a seu critério exclusivo, inclusive informações de propriedade exclusiva pertencentes a outras pessoas ou empresas (ex. direito de auto, marcas), sem a expressa autorização do titular desses direitos, cuja violação não será de responsabilidade do Churrapp.{'\n'}
        8.3. Titularidade do Conteúdo. Qualquer Conteúdo de Usuário fornecido por você permanece de sua propriedade. Contudo, ao fornecê-lo para o Churrapp, você nos outorga uma licença em nível mundial, por prazo indeterminado, gratuita e transferível, e com direito a sublicenciar, usar, copiar, modificar, criar obras derivadas, distribuir, publicar, exibir esse Conteúdo de Usuário em todos os formatos e canais de distribuição possíveis, sem necessidade de novo aviso a você, e sem necessidade de qualquer pagamento, desde que isso esteja relacionado ao funcionamento da plataforma. Ademais, senhas e dados bancários são protegidos por criptografia, o que significa que nós seremos "cegos" com relação a esse Conteúdo.{'\n'}
        8.4. Exclusão do Conteúdo. O Churrapp poderá, mas não se obriga a, analisar, monitorar e remover Conteúdo de Usuário, a critério exclusivo do Churrapp, a qualquer momento e por qualquer motivo, sem nenhum viso a você.
</Text>
                        <Text style={{ textAlign: 'justify' }}>
                            <Text style={{ fontWeight: 'bold' }}>9. O QUE MAIS EU PRECISO SABER SOBRE ESTES <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>TERMOS DE USO</Text>?</Text>{'\n'}
        9.1. Alterações. Para melhorar sua experiência, o Churrapp está sempre sendo atualizado. Por esse motivo, estes <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text> podem ser alterados, a qualquer tempo, a fim de refletir os ajustes realizados. No entanto, sempre que ocorrer qualquer modificação, você será previamente informado pelo endereço de e-mail fornecido por você no momento do cadastro ou por um aviso em destaque na aplicação. Caso você não concorde com os novos <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text>, você poderá rejeitá-los, mas, infelizmente, isso significa que você não poderá mais ter acesso e fazer uso do Churrapp. Se de qualquer maneira você utilizar o Churrapp mesmo após a alteração destes <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text>, isso significa que você concorda com todas as modificações.{'\n'}
        9.2. Conflito entre Disposições. Em caso de conflito entre estes termos e os termos modificados, os termos posteriores prevalecerão com relação a esse conflito.{'\n'}
        9.3. Lei e Foro. Estes <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text> são regidos pelas leis da República Federativa do Brasil. Quaisquer dúvidas e situações não previstas nestes <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text> serão primeiramente resolvidas pelo Churrapp e, caso persistam, deverão ser solucionadas pelo Foro da Comarca de Campinas, São Paulo, com exclusão de qualquer outro, por mais privilegiado que seja ou venha a ser.{'\n'}
        9.4. Dúvidas. Caso você tenha alguma dúvida, comentário ou sugestão, por favor entre em contato conosco por meio do e-mail <Text style={{ color: 'maroon' }}>contato@churrapp.com</Text>.
</Text>
                    </ScrollView>
                </View>
                // </View>



            }

        </View >
    );
}

export default TermoDeUso;