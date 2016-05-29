<?php
namespace SoL\Controllers;

//require_once 'phink/mvc/controller.php';
//require_once 'phink/core/log.php';
//require_once 'phink/crypto/crypto.php';

use Phink\Web\UI\TControl;
use Phink\Crypto\TCrypto;

/**
 * Description of logme
 *
 * @author david
 */

 class Token extends TControl {
   //put your code here
    
    protected $label = 'Token';
    protected $token = '';
    
    
    public function setLabel($value) {
        $this->label = $value;
    }
    
    public function getLabel() {
        return $this->label;
    }
    
    public function showToken() {
        $this->token = TCrypto::generateToken();
    }
    	public function createObjects() {	}	public function declareObjects() {	}	public function afterBindingObjects() {	}	public function displayHtml() {?><h2><?php echo $this->label; ?></h2>
<table>
    <tr>
        <td>
            <a id="tokenLink" href="#" >
    <?php echo $this->token; ?>
            </a>
        </td>
    </tr>
</table>
<?php	}}