<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of vehicleOptions
 *
 * @author David
 */


//require_once 'phoenix/core/console.php';
//require_once 'phoenix/mails.php';

class Program extends TConsole {
    
    public function __construct($argv) {
        parent::__construct($argv);
    }

    public static function main($argv) {
        $program = new Program($argv);
        $program->send();
    }	

    public function init() {
    
    }
    
    public function send() {
        
        TConsole::log("Liste les options du Renault Captur");
        $sender = "no-reply@club-auto.com";
        $recipients =  'dblanchard1@bbox.fr,dpjb@free.fr,dpjb@hotmail.fr,dpjb78@gmail.com,akades@orange.fr';
        //$recipients = explode ($recipients); 

        $civ = 'Monsieur';
        $nom = 'BLANCHARD';
        $nomclub = 'AutoDiscount';
        $libmarque = 'RENAULT';
        $libmodele = 'Clio IV';
        $link = 'http://www.clubauto-metro.com/modele.php?marque=CITROEN&gamme=C4&mod=129927|IN|1';
        //&confirm=1&location=aHR0cDovL3d3dy5jbHViYXV0by1tZXRyby5jb20vbGlic192Mi9kZXZpc19saWduZV92Mi9saXZlX2RlbF9yZXNlcnZlci5waHA/ZGVsX29wdGlvbnM9JmRlbF9uYXRjb2RlPTEyOTkyNyZkZWxfbWFyY2hlPUlOJmRlbF9yZWM9MSZnb19tb2RpZj0mZGVsX2VtYWlsPSZlbWFpbD1kYXZpZGJsQHdhbmFkb28uZnImY2l2aWxpdGU9TW9uc2lldXImbm9tPUJMT05ESU4mcHJlbm9tPURhdmlkJnRlbGVwaG9uZT0wNjA1MDQwMzAyJmNvZGVwdHQ9NzUwMDEmY29uZmlybT0x

        $subject = "Confirmation d'inscription au devis gratuit $nomclub";
        $message_txt = "Bonjour $civ $nom,\r\n
        \r\n
        Vous avez demand&eacute; un devis en ligne gratuit concernant le v&eacute;hicule $libmarque $libmodele sur le site $nomclub.&nbsp;Nous souhaitons v&eacute;rifier que vous &ecirc;tes le bon destinataire du devis.&nbsp;Veuillez le confirmer en cliquant sur le lien ci-dessous.\r\n
        \r\n
        Confirmer votre inscription en copiant ce lien dans votre navigateur habituel : $link\r\n
        \r\n
        Vous recevrez votre premier devis gratuit et n'aurez plus &agrave; vous inscrire.\r\n
        \r\n
        Bien cordialement,\r\n
        \r\n
        Le Service Customer.\r\n
        \r\n";
        $message_html = "<html>
    <head>
        <title>$subject</title>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width'>
    </head>
    <body>
	Bonjour $civ $nom,<br>
		<br>
		Vous avez demand&eacute; un devis en ligne gratuit concernant le v&eacute;hicule $libmarque $libmodele sur le site $nomclub.&nbsp;Nous souhaitons v&eacute;rifier que vous &ecirc;tes le bon destinataire du devis.&nbsp;Veuillez le confirmer en cliquant sur le lien ci-dessous.<br>
		<br>
		<a href='$link'>Confirmer votre inscription</a><br>
		<br>
		Vous recevrez votre premier devis gratuit et n'aurez plus &agrave; vous inscrire.<br>
		<br>
		Bien cordialement,<br>
		<br>
		Le Service Customer.<br>
    </body>
</html>		
		";	

        //$res = $this->sendOneMail($sender, $recipient, $subject, $message_txt, $message_html);
        //$res = $this->sendSwiftMail($sender, $recipients, $subject, $message_txt, $message_html);
        $res = $this->simpleMail($sender, $recipients, $subject, $message_html);
        TConsole::log("RES : $res");
    }
    
    public function simpleMail($sender, $recipient, $subject, $html = '') {
        $headers = "From: $sender\r\n";
        //$headers .= "Reply-To: $nom_mail\r\n";
        $headers .= "BCC: david.blanchard@club-auto.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        return mail($recipient, $subject, $html, $headers);        
    }
    
    public function sendSwiftMail($sender, $recipient, $subject, $text = '', $html = '') {
        require_once('swift_required.php');
		
        $transport = Swift_SmtpTransport::newInstance('smtp.magic.fr', 25);		
        $mailer = Swift_Mailer::newInstance($transport);

        $message = Swift_Message::newInstance()
        // Give the message a subject
        ->setSubject($subject)
        // Set the From address with an associative array
        ->setFrom(array($sender))
        // Set the To addresses with an associative array
        ->setTo($recipients)
        // Give it a body
        ->setBody($text)
        // And optionally an alternative body
        ->addPart($html, 'text/html');	
        // Optionally add any attachments
        //->attach(Swift_Attachment::fromPath('my-document.pdf')

        $result = $mailer->send($message);

		return $result;
    }
	
    public function sendOneMail($sender, $recipient, $subject, $text = '', $html = '', $charset = '', $attachments = null, $bcc = '') {
        $result = FALSE;

        require_once('Mail.php');
        require_once('Mail/mime.php');

        if($sender == '') {
                $sender = "no-reply@club-auto.com"; 

        }

        $crlf = "\n";
        $headers = array(
        'From'=> $sender,
        'To'=> $recipient,    
        'Return-Path' => $sender,
        'Subject' => $subject
        );

        // Creating the Mime message
        $mime = new Mail_mime($crlf);

        // Setting the body of the email
        if($text != '') {
                $mime->setTXTBody($text);
        }
        if($html != '') {
                $mime->setHTMLBody($html);
        }

        if($text == '' && $html == '' ) {
                throw new InvalidArgumentException("Aucun corps de mail fourni.");
        }

        // Add an attachment
        if ($attachments != '') {
                foreach($attachments as $attachment) {
                        list($name, $file, $type) = $attachment;
                        $mime->addAttachment($file, $type, $name, 0);
                }
        }

        // Set body and headers ready for base mail class
        if($charset != '') {
                $body = $mime->get(array('text_charset' => $charset));
        } else {
                $body = $mime->get();

        }

        $headers = $mime->headers($headers);

        // SMTP authentication params
        $smtp_params["host"] = "smtp.magic.fr";
        $smtp_params["port"] = "25";

        // Sending the email using smtp
        $mail = &Mail::factory("SMTP", $smtp_params);
        $result = $mail->send($recipient, $headers, $body);

        if (PEAR::isError($mail)) {
                $result = "ERR:" . $mail->getMessage();
        }

        return $result;
    }
}

Program::main($argv);


?>
