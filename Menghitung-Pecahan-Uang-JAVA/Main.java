import javax.swing.JOptionPane;
import javax.swing.ImageIcon;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JPanel;

class Utilitas
{
	// The Component
	protected String judul = "Menghitung Uang Pecahan";
	protected String[] msgDisplay = {"Selamat Datang di Aplikasi \nPenghitung Uang Pecahan sederhana \nBersama Nico! \nNico Nico Nii!!!", "Apakah kamu ingin menghitung \nUang Pecahan bersama Nico?", "Masukkan Nominal uangnya: ", "Hmmph! Yaudah kalau gak mau!", "Terima Kasih sudah menggunakan program ini :) \nSampai Jumpai \nNico Nico Nii!"};
	protected String niconiconii = "Nico Nico Nii!\nAnata no haato ni Nico-Nico-Nii!\nEgao todokeru Yazama Nico-Nico\nNico Nii te oboete rabu Nico!";

	// The Icon
	protected ImageIcon nicoSad = new ImageIcon("src/nico1.png");
	protected ImageIcon nicoFlat = new ImageIcon("src/nico2.png");
	protected ImageIcon nicoNii = new ImageIcon("src/nico3.png");
	protected ImageIcon nicoPeace = new ImageIcon("src/nico4.png");
	protected ImageIcon nicoNiiUniform = new ImageIcon("src/nico5.png");
	protected ImageIcon nicoAngry = new ImageIcon("src/nico6.png");
	protected ImageIcon nicoAngkuh = new ImageIcon("src/nico7.png");
}

class UangPecahan
{
	private int confirm1, uang, okOption, opr;
	private Utilitas util = new Utilitas();
	private String[] options = {"OK"};
	private JPanel panel = new JPanel();
	private JLabel label = new JLabel(util.msgDisplay[2], util.nicoFlat, JLabel.CENTER);
	private JTextField input = new JTextField(10);	
	
	// Get Input
	private String getInput(){
		panel.add(label);
		panel.add(input);
		JOptionPane.showOptionDialog(null, panel, util.judul, JOptionPane.OK_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		return input.getText();
	}
	
	// Get Welcome
	private void getWelcome(){
		JOptionPane.showMessageDialog(null, util.niconiconii, util.judul, JOptionPane.OK_OPTION, util.nicoNii);
		JOptionPane.showMessageDialog(null, util.msgDisplay[0], util.judul, JOptionPane.OK_OPTION, util.nicoPeace);
		confirm1 = JOptionPane.showConfirmDialog(null, util.msgDisplay[1], util.judul, JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, util.nicoAngkuh);
	}
	
	// Validator 
	private boolean checkZero(int zero){
		if (zero == 0) {
			return false;
		} else {
			return true;
		}
	}
	
	// Set One Hundred
	private int setSeratusRibu(int uang){
		return uang / 100000;
	}
	
	private int setLimaPuluhRibu(int uang){
		return (uang % 100000) / 50000;
	}
	
	private int setDuaPuluhRIbu(int uang){
		return (uang % 50000) / 20000;
	}
	
	private int setSepuluhRibu(int uang){
		opr = (uang % 50000) / 10000;
		
		if (opr % 2 == 0 ) {
			return 0;
		} else {
			return (uang % 50000) / 20000;
		}
		
	}
	
	private int setLimaRibu(int uang){
		return (uang % 10000) / 5000;
	}
	
	private int setDuaRibu(int uang){
		return (uang % 5000) / 2000;
	}
	
	private int setSeribu(int uang){
		opr = (uang % 5000) / 1000;
		
		if (opr % 2 == 0) {
			return 0;
		} else {
			return (uang % 5000) / 2000;
		}
	}
	
	private int setLimaRatus(int uang){
		return (uang % 1000) / 500;
	}
	
	private int setDuaRatus(int uang){
		return (uang % 500) / 200;
	}
	
	private int setSeratus(int uang){
		opr = (uang % 500) / 100;
		
		if (opr % 2 == 0) {
			return 0;
		} else {
			return (uang % 500) / 200;
		}
	}
	
	private int setLimaPuluh(int uang){
		return (uang % 100) / 50;
	}
	
	private int setDuaPuluh(int uang){
		return (uang % 50) / 20;
	}
	
	private int setSepuluh(int uang){
		opr = (uang % 50) / 10;
		
		if (opr % 2 == 0) {
			return 0;
		} else {
			return (uang % 50) / 20;
		}
	}
	
	private int setSatu(int uang){
		return (uang % 10) / 1;
	}
	
	private void getResult(String input){
		uang = Integer.parseInt(input);
		String hasil = "Rincian Pecahan " + uang + " :\n";
		if (checkZero(setSeratusRibu(uang))) {
			hasil += "100 ribu = " + setSeratusRibu(uang) + " Lembar\n";
		}
		if (checkZero(setLimaPuluhRibu(uang))) {
			hasil += "50 ribu = " + setLimaPuluhRibu(uang) + " Lembar\n";
		}
		if (checkZero(setDuaPuluhRIbu(uang))) {
			hasil += "20 ribu = " + setDuaPuluhRIbu(uang) + " Lembar\n";
		}
		if (checkZero(setSepuluhRibu(uang))) {
			hasil += "10 ribu = " + setSepuluhRibu(uang) + " Lembar\n";
		}
		if (checkZero(setLimaRibu(uang))) {
			hasil += "5 ribu = " + setLimaRibu(uang) + " Lembar\n";
		}
		if (checkZero(setDuaRibu(uang))) {
			hasil += "2 ribu = " + setDuaRibu(uang) + " Lembar\n";
		}
		if (checkZero(setSeribu(uang))) {
			hasil += "Seribu = " + setSeribu(uang) + " Lembar\n";
		}
		if (checkZero(setLimaRatus(uang))) {
			hasil += "500 perak = " + setLimaRatus(uang) + " Keping\n";
		}
		if (checkZero(setDuaRatus(uang))) {
			hasil += "200 perak = " + setDuaRatus(uang) + " Keping\n";
		}
		if (checkZero(setSeratus(uang))) {
			hasil += "100 perak = " + setSeratus(uang) + " Keping\n";
		}
		if (checkZero(setLimaPuluh(uang))) {
			hasil += "50 perak = " + setLimaPuluh(uang) + " Keping\n";
		}
		if (checkZero(setDuaPuluh(uang))) {
			hasil += "20 perak = " + setDuaPuluh(uang) + " Keping\n";
		}
		if (checkZero(setSepuluh(uang))) {
			hasil += "10 perak = " + setSepuluh(uang) + " Keping\n";
		}
		if (checkZero(setSatu(uang))) {
			hasil += "1 perak = " + setSatu(uang) + " Keping\n";
		}
		hasil += "\n\n Tekan Yes untuk mengulang \n dan Cancel untuk keluar";
		okOption = JOptionPane.showOptionDialog(null, hasil, util.judul, JOptionPane.OK_OPTION, JOptionPane.INFORMATION_MESSAGE, util.nicoPeace, null, null);
	}
	
	private void getEnding(){
		JOptionPane.showMessageDialog(null, util.msgDisplay[4], util.judul, JOptionPane.OK_OPTION, util.nicoNiiUniform);
	}
	
	// Get Display
	public void getDisplay(){
		getWelcome();
		if (confirm1 == JOptionPane.YES_OPTION) {
			do {
				getResult(getInput());
			} while (okOption == JOptionPane.OK_OPTION);
			getEnding();
		}else{
			JOptionPane.showMessageDialog(null, util.msgDisplay[3], util.judul, JOptionPane.OK_OPTION, util.nicoAngry);
		}
	}
}

// Class Utama
public class Main 
{
	public static void main(String[] args) {
		UangPecahan test = new UangPecahan();
		test.getDisplay();
	}
}