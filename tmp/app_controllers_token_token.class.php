<?php
namespace Detroit\Controllers;

//require_once 'phoenix/mvc/controller.php';
//require_once 'phoenix/core/log.php';
//require_once 'phoenix/crypto/crypto.php';

use Phoenix\Web\UI\TControl;
use Phoenix\Crypto\TCrypto;

/**
 * Description of logme
 *
 * @author david
 */

 class Token extends TControl {
   //put your code here
    
    protected $label = '';
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
    	public function createObjects() {	}	public function declareObjects() {	}	public function displayHtml() {?><h2><?php echo $this->label; ?></h2>
<table>
    <tr>
        <td>
            <a id="tokenLink" href="javascript:void(0)" >
    <?php echo $this->token; ?>
            </a>
        </td>
    </tr>
</table>
<?php	}}