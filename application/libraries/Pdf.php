<?php defined('BASEPATH') OR exit('No direct script access allowed');
/**


* CodeIgniter PDF Library
 *
 * Generate PDF's in your CodeIgniter applications.
 *
 * @package         CodeIgniter
 * @subpackage      Libraries
 * @category        Libraries
 * @author          Chris Harvey
 * @license         MIT License
 * @link            https://github.com/chrisnharvey/CodeIgniter-  PDF-Generator-Library



*/

// require_once "vendor/autoload.php";

use Dompdf\Dompdf;
// use Dompdf\Options;
// require_once 'vendor/autoload.inc.php';
// $options = new Options();
// $options->set('isRemoteEnabled', TRUE);
// $dompdf = new Dompdf($options);
// $contxt = stream_context_create([ 
//     'ssl' => [ 
//         'verify_peer' => FALSE, 
//         'verify_peer_name' => FALSE,
//         'allow_self_signed'=> TRUE
//     ] 
// ]);
// $dompdf->setHttpContext($contxt);
// ...
class Pdf extends Dompdf{
    /**
     * PDF filename
     * @var String
     */
    public $filename;
    public function __construct(){
        parent::__construct();
        // $this->filename = "laporan.pdf";
    }
    /**
     * Get an instance of CodeIgniter
     *
     * @access    protected
     * @return    void
     */
    protected function ci()
    {
        return get_instance();
    }
    /**
     * Load a CodeIgniter view into domPDF
     *
     * @access    public
     * @param    string    $view The view to load
     * @param    array    $data The view data
     * @return    void
     */
    public function load_view($view, $data = array()){
        $html = $this->ci()->load->view($view, $data, TRUE);
        $this->load_html($html);
        // Render the PDF
        // $this->render();
            // Output the generated PDF to Browser
            //    $this->stream($this->filename, array("Attachment" => false));
    }
}