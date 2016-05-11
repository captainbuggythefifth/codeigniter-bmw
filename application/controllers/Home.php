<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     *	- or -
     * 		http://example.com/index.php/welcome/index
     *	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        $this->load->view('users/index/index');
    }

    public function contact(){
        $aCss = array(
            'client/vendor/internal/contact/css/contact.css'
        );
        $aData = array(
            'aCss' => $aCss
        );
        $this->load->view('users/internal/layouts/header', $aData);
        $this->load->view('users/internal/contact/index');
        $this->load->view('users/internal/layouts/footer');
    }

    public function about(){
        $aCss = array(
            'client/vendor/internal/about/css/about-us.css'
        );
        $aData = array(
            'aCss' => $aCss
        );
        $this->load->view('users/internal/layouts/header', $aData);
        $this->load->view('users/internal/about/index');
        $this->load->view('users/internal/layouts/footer');
    }

    public function cio(){
        $aCss = array(
            'client/vendor/internal/cio/css/cio.css'
        );
        $aData = array(
            'aCss' => $aCss
        );
        $this->load->view('users/internal/layouts/header', $aData);
        $this->load->view('users/internal/cio/index');
        $this->load->view('users/internal/layouts/footer');
    }

    public function team(){
        $aCss = array(
            'client/vendor/internal/team/css/team-css.css'
        );
        $aData = array(
            'aCss' => $aCss
        );
        $this->load->view('users/internal/layouts/header', $aData);
        $this->load->view('users/internal/team/index');
        $this->load->view('users/internal/layouts/footer');
    }
}
